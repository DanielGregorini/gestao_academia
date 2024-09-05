class LoginData {
  token?: string;
  userType?: string;
  professor?: {
    idProfessor?: number;
    idAcademia?: number;
    nome?: string;
    cpf?: string;
    dtNascimento?: Date;
    login?: string;
    senha?: string;
  }
  aluno?: {
    idAluno?: number;
    idProfessor?: number;
    idAcademia?: number;
    nome?: string;
    cpf?: string;
    dtNascimento?: Date;
    login?: string;
    senha?: string;
  };
}

export default LoginData;