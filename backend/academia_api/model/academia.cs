using System.ComponentModel.DataAnnotations.Schema;

namespace academia_api.model
{
    [Table("tb_academia")]
    public class Academia
    {
        public int IdAcademia { get; set; }
        public string? Nome { get; set; }
        public string? Cnpj { get; set; }
        public string? Endereco { get; set; }

        public ICollection<Professor>? Professores { get; set; }
        public ICollection<Aluno>? Alunos { get; set; }
    }
}