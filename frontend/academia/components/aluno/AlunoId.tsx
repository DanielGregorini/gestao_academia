"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Aluno from "@/utils/classes/aluno";

function AlunoId() {
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

  return <div>ID: {aluno?.idAluno}</div>;
}

export default AlunoId;
