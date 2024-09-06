import Treino from "@/utils/classes/treino";
import React from "react";

interface TreinoCardProps {
  treino: Treino;
  onClickPut: (idTreino: number) => void;
  onClickDelete: (idTreino: number) => void;
}

function TreinoCard({ treino, onClickPut, onClickDelete }: TreinoCardProps) {
  const exercicios = treino.listaExercicios
    ? treino.listaExercicios.split(";")
    : [];

  function handleClick() {
    onClickPut(treino.idTreino !== undefined ? treino.idTreino : 1);
  }

  function handleClickDelete() {
    onClickDelete(treino.idTreino !== undefined ? treino.idTreino : 1);
  }

  return (
    <div className="bg-slate-50 w-1/4 mx-5 p-4 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-bold mb-2">Treino {treino.letra}</h2>

      <h3 className="text-lg font-semibold mb-1">Exercícios:</h3>
      <ul className="list-disc list-inside text-gray-600">
        {exercicios.map((exercicio, index) => (
          <li key={index}>{exercicio.trim()}</li>
        ))}
      </ul>
      <div>
        <button className="" onClick={handleClick}>
          Editar
        </button>
      </div>

      <div>
        <button className="" onClick={handleClickDelete}>
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TreinoCard;
