class Aluno {
  id_aluno?: number;
  id_professor?: number;
  id_academia?: number;
  nome?: string;
  cpf?: string;
  dt_nascimento: Date;
  login?: string;
  senha?: string;

  constructor(
    id_aluno: number,
    id_professor: number,
    id_academia: number,
    nome: string,
    cpf: string,
    dt_nascimento: Date,
    login: string,
    senha: string
  ) {
    this.id_aluno = id_aluno;
    this.id_professor = id_professor;
    this.id_academia = id_academia;
    this.nome = nome;
    this.cpf = cpf;
    this.dt_nascimento = dt_nascimento;
    this.login = login;
    this.senha = senha;
  }
}

export default Aluno;
