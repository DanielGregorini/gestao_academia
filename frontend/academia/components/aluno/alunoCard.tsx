import React from "react";
import Aluno from "@/utils/classes/aluno";

interface AlunoCardProps {
  aluno: Aluno;
}

function AlunoCard({ aluno }: AlunoCardProps) {
  const formatarData = (data: Date | undefined) => {
    return data ? new Date(data).toLocaleDateString("pt-BR") : "---";
  };

  return (
    <div className="aluno-card bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-300 w-96">
      <h3 className="aluno-nome text-xl font-semibold text-gray-900 mb-2">{aluno.nome || "Nome não informado"}</h3>
      <p className="aluno-info text-gray-700">ID: {aluno.idAluno || "---"}</p>
      <p className="aluno-info text-gray-700">CPF: {aluno.cpf || "---"}</p>
      <p className="aluno-info text-gray-700">
        Data de Nascimento: {formatarData(aluno.dtNascimento)}
      </p>
      <p className="aluno-info text-gray-700">Login: {aluno.login || "---"}</p>
    </div>
  );
}

export default AlunoCard;