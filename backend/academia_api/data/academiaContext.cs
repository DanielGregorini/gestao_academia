using Microsoft.EntityFrameworkCore;
using academia_api.model; // Certifique-se de que este namespace está correto, onde suas classes de modelos estão definidas

namespace academia_api.data
{
    public class AcademiaContext : DbContext
    {
        public AcademiaContext() {}

        public DbSet<Academia> Academias { get; set; }
        public DbSet<Professor> Professores { get; set; }
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Treino> Treinos { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //ver os log do efcore
                //optionsBuilder.LogTo(System.Console.WriteLine); ;

                string connectionString = "Server=localhost;Database=db_revendedora;User=root;Password=admin;";

                optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 25)));
            }
        }

       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            /*
             // Configuração das chaves primárias
            modelBuilder.Entity<Fornecedor>()
                .HasKey(f => f.ID);
            modelBuilder.Entity<Fornecedor>()
                .Property(f => f.ID)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Cliente>()
                .HasKey(c => c.ID);
            modelBuilder.Entity<Cliente>()
                .Property(c => c.ID)
                .ValueGeneratedOnAdd();


            */
            modelBuilder.Entity<Academia>().HasData(
                new Academia { IdAcademia = 1, Nome = "Academia X", Cnpj = "12.345.678/0001-00", Endereco = "Rua A, 123" }
            );

            modelBuilder.Entity<Professor>().HasData(
                new Professor { IdProfessor = 1, IdAcademia = 1, Nome = "Professor Y", Cpf = "123.456.789-00", DtNascimento = new DateTime(1980, 1, 1), Login = "prof_y", Senha = "senha123" }
            );

            modelBuilder.Entity<Aluno>().HasData(
                new Aluno { IdAluno = 1, IdProfessor = 1, IdAcademia = 1, Nome = "Aluno Z", Cpf = "987.654.321-00", DtNascimento = new DateTime(2000, 5, 15), Login = "aluno_z", Senha = "senha456" }
            );

            modelBuilder.Entity<Treino>().HasData(
                new Treino { IdTreino = 1, IdAluno = 1, Letra = "A", DiaSemana = "Segunda", ListaExercicios = "Supino, Agachamento, Barra Fixa" }
            );
        }
    }
}
