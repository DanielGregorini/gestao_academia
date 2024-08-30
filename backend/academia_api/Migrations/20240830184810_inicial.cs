using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace academia_api.Migrations
{
    /// <inheritdoc />
    public partial class inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "tb_academia",
                columns: table => new
                {
                    IdAcademia = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Cnpj = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Endereco = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_academia", x => x.IdAcademia);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "tb_professor",
                columns: table => new
                {
                    IdProfessor = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdAcademia = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Cpf = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DtNascimento = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Login = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Senha = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_professor", x => x.IdProfessor);
                    table.ForeignKey(
                        name: "FK_tb_professor_tb_academia_IdAcademia",
                        column: x => x.IdAcademia,
                        principalTable: "tb_academia",
                        principalColumn: "IdAcademia",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "tb_aluno",
                columns: table => new
                {
                    IdAluno = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdProfessor = table.Column<int>(type: "int", nullable: false),
                    IdAcademia = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Cpf = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DtNascimento = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Login = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Senha = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_aluno", x => x.IdAluno);
                    table.ForeignKey(
                        name: "FK_tb_aluno_tb_academia_IdAcademia",
                        column: x => x.IdAcademia,
                        principalTable: "tb_academia",
                        principalColumn: "IdAcademia",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_aluno_tb_professor_IdProfessor",
                        column: x => x.IdProfessor,
                        principalTable: "tb_professor",
                        principalColumn: "IdProfessor",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "tb_treino",
                columns: table => new
                {
                    IdTreino = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdAluno = table.Column<int>(type: "int", nullable: false),
                    Letra = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DiaSemana = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ListaExercicios = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_treino", x => x.IdTreino);
                    table.ForeignKey(
                        name: "FK_tb_treino_tb_aluno_IdAluno",
                        column: x => x.IdAluno,
                        principalTable: "tb_aluno",
                        principalColumn: "IdAluno",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_tb_aluno_IdAcademia",
                table: "tb_aluno",
                column: "IdAcademia");

            migrationBuilder.CreateIndex(
                name: "IX_tb_aluno_IdProfessor",
                table: "tb_aluno",
                column: "IdProfessor");

            migrationBuilder.CreateIndex(
                name: "IX_tb_professor_IdAcademia",
                table: "tb_professor",
                column: "IdAcademia");

            migrationBuilder.CreateIndex(
                name: "IX_tb_treino_IdAluno",
                table: "tb_treino",
                column: "IdAluno");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_treino");

            migrationBuilder.DropTable(
                name: "tb_aluno");

            migrationBuilder.DropTable(
                name: "tb_professor");

            migrationBuilder.DropTable(
                name: "tb_academia");
        }
    }
}
