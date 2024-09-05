"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Treino from "@/utils/classes/treino";

const MeusAlunosIdPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreinos();
  }, []);

  async function fetchTreinos() {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5298";
    let treinosUrl = `${backendUrl}/treino/aluno/${id}`;
    let token: any;
    const storedData = localStorage.getItem("loginToken");

    if (storedData) {
      const parsedData = await JSON.parse(storedData);
      token = parsedData.token;
    } else {
      router.push("/login");
    }

    try {
      let response = await fetch(treinosUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.ok) {
        const treinos_: Treino[] = await response.json();
        console.log("Treinos:", treinos_);
        setLoading(false);
        setTreinos(treinos_);
      } else if (response.status === 401) {
        console.error("Acesso não autorizado.");
        //router.push("/login");
        //setLoading(false);
      } else {
        const error = await response.json();
        console.error("Falha ao consultar os treinos:", error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  }

  if (isLoading) {
    return (
      <div
        style={{ minHeight: "50rem" }}
        className="text-center text-4xl mt-20"
      >
        Loading...
      </div>
    );
  }

  return (
    <main style={{ minHeight: "50rem" }}>
      <h1>Editar Treino dos alunos</h1>
      <p>Aluno ID: {id}</p>
    </main>
  );
};

export default MeusAlunosIdPage;