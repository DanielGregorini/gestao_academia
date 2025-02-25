using System;
using System.Linq;
using academia_api.model;
using academia_api.data;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace academia_api_tests
{
    public class AcademiaContextAlunoTreinoTests
    {
        [Fact]
        public void AdicionaAlunoComDoisTreinosEConsultaCorretamente()
        {
            // Arrange: Cria opções para usar um banco de dados InMemory
            var options = new DbContextOptionsBuilder<AcademiaContext>()
                .UseInMemoryDatabase(databaseName: "TestAcademiaDbAlunoTreino")
                .Options;

            int alunoId;

            // Act: Insere um novo Aluno e dois Treinos no banco InMemory
            using (var context = new AcademiaContext(options))
            {
                var novoAluno = new Aluno
                {
                    IdProfessor = 1,
                    IdAcademia = 1,
                    Nome = "Carlos Silva",
                    Cpf = "98765432100",
                    DtNascimento = new DateTime(1995, 3, 10),
                    Login = "carlos.silva",
                    Senha = "senhaCarlos123"
                };

                context.Alunos.Add(novoAluno);
                context.SaveChanges();

                alunoId = novoAluno.IdAluno;

                var treino1 = new Treino
                {
                    IdAluno = alunoId,
                    Letra = "A",
                    DiaSemana = "Segunda-feira",
                    ListaExercicios = "Supino, Agachamento, Remada"
                };

                var treino2 = new Treino
                {
                    IdAluno = alunoId,
                    Letra = "B",
                    DiaSemana = "Quarta-feira",
                    ListaExercicios = "Levantamento Terra, Desenvolvimento, Rosca Direta"
                };

                context.Treinos.AddRange(treino1, treino2);
                context.SaveChanges();
            }

            // Assert/Act: Recupera o aluno e seus treinos do banco
            using (var context = new AcademiaContext(options))
            {
                var alunoEncontrado = context.Alunos.Include(a => a.Treinos).FirstOrDefault(a => a.IdAluno == alunoId);

                // Valida se o aluno foi encontrado
                Assert.NotNull(alunoEncontrado);
                Assert.Equal("Carlos Silva", alunoEncontrado.Nome);
                Assert.Equal("98765432100", alunoEncontrado.Cpf);
                Assert.Equal("carlos.silva", alunoEncontrado.Login);
                Assert.Equal(1, alunoEncontrado.IdProfessor);
                Assert.Equal(1, alunoEncontrado.IdAcademia);
                
                // Valida se os treinos foram encontrados
                Assert.NotNull(alunoEncontrado.Treinos);
                Assert.Equal(2, alunoEncontrado.Treinos.Count);
                Assert.Contains(alunoEncontrado.Treinos, t => t.Letra == "A" && t.DiaSemana == "Segunda-feira" && t.ListaExercicios.Contains("Supino"));
                Assert.Contains(alunoEncontrado.Treinos, t => t.Letra == "B" && t.DiaSemana == "Quarta-feira" && t.ListaExercicios.Contains("Levantamento Terra"));
            }
        }
    }
}
