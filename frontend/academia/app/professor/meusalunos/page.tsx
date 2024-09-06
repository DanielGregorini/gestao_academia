"use client";
import React, { useState, useEffect } from "react";
import Aluno from "@/utils/classes/aluno";
import Professor from "@/utils/classes/professor";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AlunoCard from "@/components/aluno/alunoCard";

function MeusTreinosPage() {
  const router = useRouter();
  const [professor, setProfessor] = useState<Professor>(new Professor());
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("loginToken");
    if (!storedData) {
      router.push("/login");
      return;
    }

    const parsedData = JSON.parse(storedData);
    const professor_: Professor = parsedData.userDetails || null;

    if (!professor_) {
      router.push("/login");
      return;
    }

    setProfessor(professor_);

    if (professor_.idProfessor !== undefined) {
      fetchAlunos(professor_.idProfessor);
    }
  }, []);

  async function fetchAlunos(idProfessor: number) {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5298";
    let alunoPorProfessorUrl = `${backendUrl}/aluno/professor/${idProfessor}`;

    try {
      let response = await fetch(alunoPorProfessorUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: Aluno[] = await response.json();
        setAlunos(data);
      } else {
        const error = await response.json();
        console.error("Sem alunos do professor ", error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  return (
    <main style={{ minHeight: "50rem" }}>
      {alunos.length > 0 ? (
        <div>
          <h1 className="text-center text-4xl my-10">Meus Alunos</h1>
          <div className="flex flex-wrap justify-center">
            {alunos.map((aluno) => (
              <div key={aluno.idAluno} className="mx-10">
                
                <Link href={`/professor/meusalunos/${aluno.idAluno}`}>
                <AlunoCard aluno={aluno} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Nenhum aluno encontrado</div>
      )}
    </main>
  );
}

export default MeusTreinosPage;
