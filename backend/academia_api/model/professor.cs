using System.ComponentModel.DataAnnotations.Schema;

namespace academia_api.model
{
    [Table("tb_professor")]
    public class Professor
    {
        public int IdProfessor { get; set; }
        public int IdAcademia { get; set; }
        public string? Nome { get; set; }
        public string? Cpf { get; set; }
        public DateTime DtNascimento { get; set; }
        public string? Login { get; set; }
        public string? Senha { get; set; }

        public Academia? Academia { get; set; } 
        public ICollection<Aluno>? Alunos { get; set; }
    }

}