import React from "react";
import ResumoTreino from "@/components/meustreinos/ResumoTreino";
import Treino from "@/utils/classes/treino";

const treino1 = new Treino(
  1,                    // id_treino
  101,                  // id_aluno
  'A',                  // letra
  'Segunda-feira',      // dia_semana
  'Supino; Agachamento; Flexão'  // lista_exercicios
);

const treino2 = new Treino(
  2,                    // id_treino
  102,                  // id_aluno
  'B',                  // letra
  'Quarta-feira',       // dia_semana
  'Remada; Leg Press; Barra Fixa'  // lista_exercicios
);

const treino3 = new Treino(
  3,                    // id_treino
  103,                  // id_aluno
  'C',                  // letra
  'Sexta-feira',        // dia_semana
  'Desenvolvimento; Extensão de Tríceps; Rosca Direta'  // lista_exercicios
);

// Vetor (array) contendo os objetos Treino
const treinos: Treino[] = [treino1, treino2, treino3];

function MeusTreinosPage() {
  return (
    <main style={{ minHeight: "50rem" }}>
      <h1 className="text-center text-4xl mb-10">Meus Treinos:</h1>
      <div className="flex justify-center items-center w-full">
        {treinos.map((treino) => (
          <ResumoTreino 
            treino = {treino}
          />
        ))}
      </div>
    </main>
  );
}

export default MeusTreinosPage;
