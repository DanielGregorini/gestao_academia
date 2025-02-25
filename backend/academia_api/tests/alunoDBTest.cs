using System;
using System.Linq;
using academia_api.model;
using academia_api.data;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace academia_api_tests
{
    public class AcademiaContextTests
    {
        [Fact]
        public void AdicionaAlunoEAtualizaComIdCorreto()
        {
            // Arrange: Cria opções para usar um banco de dados InMemory
            var options = new DbContextOptionsBuilder<AcademiaContext>()
                .UseInMemoryDatabase(databaseName: "TestAcademiaDb")
                .Options;

            int alunoId;

            // Act: Insere um novo Aluno no banco InMemory
            using (var context = new AcademiaContext(options))
            {
                var novoAluno = new Aluno
                {
                    IdProfessor = 1,
                    IdAcademia = 1,
                    Nome = "João da Silva",
                    Cpf = "12345678901",
                    DtNascimento = new DateTime(1990, 1, 1),
                    Login = "joao.silva",
                    Senha = "senhaSegura123"
                };

                context.Alunos.Add(novoAluno);
                context.SaveChanges();

                // Após salvar, o IdAluno é preenchido automaticamente (se for Identity)
                alunoId = novoAluno.IdAluno;
            }

            // Assert/Act: Cria um novo contexto para simular uma nova operação e recupera o aluno pelo Id
            using (var context = new AcademiaContext(options))
            {
                var alunoEncontrado = context.Alunos.Find(alunoId);

                // Valida se o aluno foi encontrado e se os dados estão corretos
                Assert.NotNull(alunoEncontrado);
                Assert.Equal("João da Silva", alunoEncontrado.Nome);
                Assert.Equal("12345678901", alunoEncontrado.Cpf);
                Assert.Equal(new DateTime(1990, 1, 1), alunoEncontrado.DtNascimento);
                Assert.Equal("joao.silva", alunoEncontrado.Login);
                Assert.Equal("senhaSegura123", alunoEncontrado.Senha);
                Assert.Equal(1, alunoEncontrado.IdProfessor);
                Assert.Equal(1, alunoEncontrado.IdAcademia);
            }
        }
    }
}
