interface LoginData {
  token: string;
  userType: string;
  professor?: {
    IdProfessor?: number;
    IdAcademia?: number;
    Nome?: string;
    Cpf?: string;
    DtNascimento?: Date;
    Login?: string;
    Senha?: string;
  }
  aluno?: {
    IdAluno?: number;
    IdProfessor?: number;
    IdAcademia?: number;
    Nome?: string;
    Cpf?: string;
    DtNascimento?: Date;
    Senha?: string;
  };
}

export default LoginData;