using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using academia_api.model;
using Microsoft.IdentityModel.Tokens;

namespace academia_api.services
{
    public static class TokenService
    {
        public static string GenerateTokenAluno(Aluno aluno)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, aluno.Login.ToString()),
                    new Claim(ClaimTypes.Role, aluno.Senha.ToString()),
                    new Claim("UserType", "aluno") 
                }),
                Expires = DateTime.UtcNow.AddHours(740),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static string GenerateTokenProfessor(Professor professor)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, professor.Login.ToString()),
                    new Claim(ClaimTypes.Role, professor.Senha.ToString()),
                    new Claim("UserType", "professor") 
                }),
                Expires = DateTime.UtcNow.AddHours(740),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}