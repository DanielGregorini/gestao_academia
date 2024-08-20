import React from "react";
import Treino from "@/utils/classes/treino";

interface ResumoTreinoProps {
  treino: Treino;
}

function ResumoTreino({ treino }: ResumoTreinoProps) {
  return (
    <div className="bg-slate-50 w-1/4 mx-5 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Treino {treino.letra}</h2>
      
      <h3 className="text-lg font-semibold mb-1">Exercícios:</h3>
      <ul className="list-disc list-inside text-gray-600">
        {treino.lista_exercicios.split(';').map((exercicio, index) => (
          <li key={index}>{exercicio.trim()}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResumoTreino;