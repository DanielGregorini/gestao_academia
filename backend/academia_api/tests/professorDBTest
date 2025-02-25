using System;
using academia_api.model;
using academia_api.data;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace academia_api_tests
{
    public class AcademiaContextProfessorTests
    {
        [Fact]
        public void AdicionaProfessorEAtualizaComIdCorreto()
        {
            // Arrange: Cria opções para usar um banco de dados InMemory
            var options = new DbContextOptionsBuilder<AcademiaContext>()
                .UseInMemoryDatabase(databaseName: "TestAcademiaDbProfessor")
                .Options;

            int professorId;

            // Act: Insere um novo Professor no banco InMemory
            using (var context = new AcademiaContext(options))
            {
                var novoProfessor = new Professor
                {
                    IdAcademia = 1,
                    Nome = "Professor João",
                    Cpf = "98765432100",
                    DtNascimento = new DateTime(1980, 5, 15),
                    Login = "prof.joao",
                    Senha = "senhaProf123"
                };

                context.Professores.Add(novoProfessor);
                context.SaveChanges();

                // Após salvar, o IdProfessor é preenchido automaticamente (se for Identity)
                professorId = novoProfessor.IdProfessor;
            }

            // Assert/Act: Cria um novo contexto para simular uma nova operação e recupera o professor pelo Id
            using (var context = new AcademiaContext(options))
            {
                var professorEncontrado = context.Professores.Find(professorId);

                // Valida se o professor foi encontrado e se os dados estão corretos
                Assert.NotNull(professorEncontrado);
                Assert.Equal("Professor João", professorEncontrado.Nome);
                Assert.Equal("98765432100", professorEncontrado.Cpf);
                Assert.Equal(new DateTime(1980, 5, 15), professorEncontrado.DtNascimento);
                Assert.Equal("prof.joao", professorEncontrado.Login);
                Assert.Equal("senhaProf123", professorEncontrado.Senha);
                Assert.Equal(1, professorEncontrado.IdAcademia);
            }
        }
    }
}
