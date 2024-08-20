class Treino {
  id_treino: number;
  id_aluno: number;
  letra: string;
  dia_semana?: string;
  lista_exercicios: string;

  constructor(
    id_treino: number,
    id_aluno: number,
    letra: string,
    dia_semana: string = '',
    lista_exercicios: string
  ) {
    this.id_treino = id_treino;
    this.id_aluno = id_aluno;
    this.letra = letra;
    this.dia_semana = dia_semana;
    this.lista_exercicios = lista_exercicios;
  }

}

export default Treino;