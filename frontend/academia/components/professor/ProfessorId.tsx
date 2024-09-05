"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Professor from "@/utils/classes/professor";

function ProfessorId() {
  const router = useRouter(); 
  const [professor, setProfessor] = useState<Professor | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("loginToken");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const initialProfessor: Professor = parsedData.userDetails
        ? parsedData.userDetails
        : null;
        setProfessor(initialProfessor); 
    } else {
      router.push("/login");
    }
  }, []);

  console.log(professor)

  return <div className="text-white">ID: {professor?.idProfessor}</div>;
}

export default ProfessorId;
