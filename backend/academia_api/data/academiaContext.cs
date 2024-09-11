using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using academia_api.model;

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
                //optionsBuilder.LogTo(System.Console.WriteLine);

                //linux
                //string connectionString = "Server=localhost;Database=db_academia;User=projeto;Password=Projeto_academia@1;";
                //string connectionString = "Server=localhost;Database=db_academia;User=root;Password=admin;";

                //db falsa
                //optionsBuilder.UseInMemoryDatabase("AcademiaDb");
                var connectionString = "Server=localhost;Database=db_academia;User=root;Password=admin;Port=3306;";
                optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 25)));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurações para Academia
            modelBuilder.Entity<Academia>()
                .HasKey(a => a.IdAcademia);
            modelBuilder.Entity<Academia>()
                .Property(a => a.IdAcademia)
                .ValueGeneratedOnAdd();  // Assegura que o Id é gerado automaticamente
            modelBuilder.Entity<Academia>()
                .HasMany(a => a.Professores)
                .WithOne(p => p.Academia)
                .HasForeignKey(p => p.IdAcademia);
            modelBuilder.Entity<Academia>()
                .HasMany(a => a.Alunos)
                .WithOne(a => a.Academia)
                .HasForeignKey(a => a.IdAcademia);

            // Configurações para Professor
            modelBuilder.Entity<Professor>()
                .HasKey(p => p.IdProfessor);
            modelBuilder.Entity<Professor>()
                .Property(p => p.IdProfessor)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Professor>()
                .HasMany(p => p.Alunos)
                .WithOne(a => a.Professor)
                .HasForeignKey(a => a.IdProfessor);
            modelBuilder.Entity<Professor>()
                .HasOne(p => p.Academia)
                .WithMany(a => a.Professores)
                .HasForeignKey(p => p.IdAcademia);

            // Configurações para Aluno
            modelBuilder.Entity<Aluno>()
                .HasKey(a => a.IdAluno);
            modelBuilder.Entity<Aluno>()
                .Property(a => a.IdAluno)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Aluno>()
                .HasOne(a => a.Professor)
                .WithMany(p => p.Alunos)
                .HasForeignKey(a => a.IdProfessor);
            modelBuilder.Entity<Aluno>()
                .HasMany(a => a.Treinos)
                .WithOne(t => t.Aluno)
                .HasForeignKey(t => t.IdAluno);

            // Configurações para Treino
            modelBuilder.Entity<Treino>()
                .HasKey(t => t.IdTreino);
            modelBuilder.Entity<Treino>()
                .Property(t => t.IdTreino)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Treino>()
                .HasOne(t => t.Aluno)
                .WithMany(a => a.Treinos)
                .HasForeignKey(t => t.IdAluno);
            

            modelBuilder.Entity<Academia>().HasData(
                new Academia
                {
                    IdAcademia = 1,
                    Nome = "Academia Central",
                    Cnpj = "12.345.678/0001-99",
                    Endereco = "Rua Principal, 123"
                }
            );

            modelBuilder.Entity<Professor>().HasData(
                new Professor
                {
                    IdProfessor = 1,
                    IdAcademia = 1,
                    Nome = "Professor João",
                    Cpf = "123.456.789-00",
                    DtNascimento = new DateTime(1980, 1, 1),
                    Login = "professor1",
                    Senha = "senha1"
                }
            );
        }
    }
}
