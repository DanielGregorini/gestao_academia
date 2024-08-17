"use client";
import { useParams } from 'next/navigation';

const EditarTreinoIdPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <main style={{ minHeight: "50rem" }}>
      <h1>Editar Treino</h1>
      <p>Treino ID: {id}</p>
      {/* Aqui você pode carregar os detalhes do treino com base no ID */}
    </main>
  );
};

export default EditarTreinoIdPage;
