"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Aluno from "@/utils/classes/aluno";

function AlunoComponent() {
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("loginToken");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const initialAluno: Aluno = parsedData.userDetails
        ? parsedData.userDetails
        : null;
      setAluno(initialAluno);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Detalhes do Aluno</h1>
      {aluno ? (
        <>
          <p>
            <strong>Nome:</strong> {aluno.nome}
          </p>
          <p>
            <strong>CPF:</strong> {aluno.cpf}
          </p>
          <p>
            <strong>Data de Nascimento:</strong>{" "}
            {aluno.dtNascimento instanceof Date
              ? aluno.dtNascimento.toLocaleDateString()
              : aluno.dtNascimento}
          </p>
          <p>
            <strong>Login:</strong> {aluno.login}
          </p>
        </>
      ) : (
        <p>Nenhum dado de aluno encontrado no localStorage.</p>
      )}
    </div>
  );
}

export default AlunoComponent;
