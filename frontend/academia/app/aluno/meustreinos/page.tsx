"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"; // Utilize 'next/router'
import Aluno from '@/utils/classes/aluno';
import ResumoTreino from '@/components/meustreinos/resumoTreino';
import Treino from '@/utils/classes/treino';

function MeusTreinosPage() {
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [treinos, setTreinos] = useState<Treino[]>([]); // Estado para armazenar os treinos

  useEffect(() => {
    const fetchData = async (treinoAlunoUrl: string, token: string) => {
      try {
        let response = await fetch(treinoAlunoUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Utilizando o token de autorização
          }
        });

        if (response.ok) {
          const treinosData = await response.json();
          setTreinos(treinosData); // Assume que a resposta é um array de treinos
          console.log(treinosData);
        } else {
          const error = await response.json();
          console.error("Failed to fetch treinos:", error);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    const storedData = localStorage.getItem('loginToken');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const initialAluno: Aluno = parsedData.userDetails ? parsedData.userDetails : null;
      setAluno(initialAluno);

      const backendUrl = process.env.BACKEND_URL || "http://localhost:5298";
      let treinoAlunoUrl = `${backendUrl}/treino/aluno/${initialAluno.idAluno}`; // Supondo que a URL é assim

      fetchData(treinoAlunoUrl, parsedData.token); // Chama a função com a URL e o token
    } else {
      router.push("/login");
    }
  }, [router]); // Adiciona 'router' como dependência

  return (
    <main style={{ minHeight: "50rem" }}>
      <div className='flex mt-10 justify-center'>
        {treinos.map((treino) => (
          <ResumoTreino key={treino.idTreino} treino={treino} />
        ))}
      </div>
    </main>
  );
}

export default MeusTreinosPage;
