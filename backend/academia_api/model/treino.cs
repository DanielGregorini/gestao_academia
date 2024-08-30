using System.ComponentModel.DataAnnotations.Schema;

namespace academia_api.model
{
    [Table("tb_treino")]
    public class Treino
    {
        public int IdTreino { get; set; }
        public int IdAluno { get; set; } 
        public string? Letra { get; set; }
        public string? DiaSemana { get; set; }
        public string? ListaExercicios { get; set; }
        public Aluno? Aluno { get; set; } 
    }
}