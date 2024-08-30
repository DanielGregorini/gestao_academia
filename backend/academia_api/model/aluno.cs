using System.ComponentModel.DataAnnotations.Schema;

namespace academia_api.model
{
    [Table("tb_aluno")]
    public class Aluno
    {
        public int IdAluno { get; set; }
        public int IdProfessor { get; set; }
        public int IdAcademia { get; set; }
        public string? Nome { get; set; }
        public string? Cpf { get; set; }
        public DateTime DtNascimento { get; set; }
        public string? Login { get; set; }
        public string? Senha { get; set; }

        public Professor? Professor { get; set; }
        public Academia? Academia { get; set; }
        public ICollection<Treino>? Treinos { get; set; }
    }

}