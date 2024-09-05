"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EditarTreinosPage = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedId(id);
    router.push(`/professor/editartreinos/${id}`);
  };

  return (
    <main style={{ minHeight: "50rem" }}>
      <h1>Selecione um Treino para Editar</h1>
      <select onChange={handleSelectChange} value={selectedId || ""}>
        <option value="" disabled>
          Selecione um ID
        </option>
        <option value="1">Treino 1</option>
        <option value="2">Treino 2</option>
        <option value="3">Treino 3</option>
        {/* Adicione mais opções conforme necessário */}
      </select>
    </main>
  );
};

export default EditarTreinosPage;
