class Treino {
  idTreino?: number;
  idAluno?: number;
  letra?: string;
  diaSemana?: string;
  listaExercicios?: string;
  
  constructor(idTreino: number, idAluno: number, letra: string, diaSemana: string, listaExercicios: string) {
    this.idTreino = idTreino;
    this.idAluno = idAluno;
    this.letra = letra;
    this.diaSemana = diaSemana;
    this.listaExercicios = listaExercicios;
  }
}

export default Treino;