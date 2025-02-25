using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using academia_api.model;
using academia_api.services;
using Xunit;

namespace academia_api_tests
{
    public class TokenServiceTests
    {
        public TokenServiceTests()
        {
            // Limpa o mapeamento padrão de claims para preservar os nomes originais tanto na criação quanto na leitura.
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
            
            // Definindo a chave secreta para os testes (supondo que você tenha implementado o método SetSecretForTesting)
            Settings.SetSecretForTesting("mysupersecretkeymysupersecretkey");
        }

        [Fact]
        public void CriarTokenAlunoRetornaTokenValido()
        {
            // Arrange: cria um aluno de exemplo
            var aluno = new Aluno
            {
                IdAluno = 1,
                Login = "alunoLogin",
                Senha = "alunoSenha",
            };

            // Act: gera o token para o aluno
            var token = TokenService.GenerateTokenAluno(aluno);
            
            // Console log: exibe o token gerado
            Console.WriteLine("Token Gerado (Aluno): " + token);

            // Assert: verifica se o token não é nulo
            Assert.NotNull(token);

            // Limpa novamente o mapeamento antes de ler o token (para garantir que os nomes não sejam convertidos)
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);

            // Console log: exibe todas as claims contidas no token
            foreach (var claim in jwtToken.Claims)
            {
                Console.WriteLine($"Claim: {claim.Type} = {claim.Value}");
            }

            // Valida as claims
            var nameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            var roleClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            Assert.Equal("alunoLogin", nameClaim);
            Assert.Equal("aluno", roleClaim);
        }

        [Fact]
        public void CriarTokenProfessorRetornaTokenValido()
        {
            // Arrange: cria um professor de exemplo
            var professor = new Professor
            {
                IdProfessor = 1,
                Login = "profLogin",
                Senha = "profSenha",
            };

            // Act: gera o token para o professor
            var token = TokenService.GenerateTokenProfessor(professor);
            
            // Console log: exibe o token gerado
            Console.WriteLine("Token Gerado (Professor): " + token);

            // Assert: verifica se o token não é nulo
            Assert.NotNull(token);

            // Limpa novamente os mapeamentos antes de ler o token
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);

            // Console log: exibe todas as claims do token
            foreach (var claim in jwtToken.Claims)
            {
                Console.WriteLine($"Claim: {claim.Type} = {claim.Value}");
            }

            // Valida as claims
            var nameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            var roleClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            Assert.Equal("profLogin", nameClaim);
            Assert.Equal("professor", roleClaim);
        }
    }
}
