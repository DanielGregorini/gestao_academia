"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; // Importando o useRouter de 'next/router'
import Aluno1 from '@/utils/classes/aluno';

interface Aluno {
  idAluno: number;
  idProfessor: number;
  idAcademia: number;
  nome: string;
  cpf: string;
  dtNascimento: string;
  login: string;
  senha?: string;
  academia?: any;
  treinos?: any;
}

function AlunoComponent() {
  // Inicialização do estado aluno diretamente com dados do localStorage na mesma linha

  const router = useRouter(); // Instância do useRouter para navegação
  const [aluno, setAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('loginToken');

    if (storedData) {
      const parsedData = JSON.parse(storedData); // Faz o parse da string JSON armazenada
      const initialAluno = parsedData.userDetails ? parsedData.userDetails : null;

      setAluno(initialAluno); // Atualiza o estado com os userDetails se existirem
    }else{
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Detalhes do Aluno</h1>
      {aluno ? (
        <>
          <p><strong>Nome:</strong> {aluno.nome}</p>
          <p><strong>CPF:</strong> {aluno.cpf}</p>
          <p><strong>Data de Nascimento:</strong> {aluno.dtNascimento}</p>
          <p><strong>Login:</strong> {aluno.login}</p>
        </>
      ) : (
        <p>Nenhum dado de aluno encontrado no localStorage.</p>
      )}
    </div>
  );
}

export default AlunoComponent;
