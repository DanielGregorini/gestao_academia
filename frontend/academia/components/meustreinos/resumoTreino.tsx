import React from "react";
import Treino from "@/utils/classes/treino";

interface ResumoTreinoProps {
  treino: Treino;
}

function ResumoTreino({ treino }: ResumoTreinoProps) {
  // Se `listaExercicios` for `undefined`, usará a string vazia como fallback
  const exercicios = treino.listaExercicios ? treino.listaExercicios.split(';') : [];

  return (
    <div className="bg-slate-50 w-1/4 mx-5 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Treino {treino.letra}</h2>
      
      <h3 className="text-lg font-semibold mb-1">Exercícios:</h3>
      <ul className="list-disc list-inside text-gray-600">
        {exercicios.map((exercicio, index) => (
          <li key={index}>{exercicio.trim()}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResumoTreino;