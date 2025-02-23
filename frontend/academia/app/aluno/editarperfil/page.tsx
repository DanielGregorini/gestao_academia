"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/form/Input";
import Aluno from "@/utils/classes/aluno";

function EditarPerfilPage() {
  const router = useRouter();
  const [aluno, setAluno] = useState<Aluno>(new Aluno());
  const [data, setData] = useState<string>('2020-01-01');
  console.log(data)

  useEffect(() => {
    const storedData = localStorage.getItem("loginToken");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const initialAluno: Aluno = parsedData.userDetails || new Aluno(); // Usa um novo Aluno como fallback
      setAluno(initialAluno);

      // Garante que dateAluno seja um objeto Date válido
      const dateAluno = new Date(initialAluno.dtNascimento || ''); // Converte para Date ou para uma data inválida se undefined
      if (!isNaN(dateAluno.getTime())) {
        // Verifica se dateAluno é uma data válida
        const dateString = dateAluno.toISOString().substring(0, 10);
        setData(dateString);
      } else {
        setData('2020-01-01'); // Define uma data padrão se a data de nascimento não for válida
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setAluno({
      ...aluno,
      [id]: id === "dt_nascimento" ? new Date(value) : value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5777";
    let atualizarUrl = `${backendUrl}/aluno/${aluno.idAluno}`;

    let aluno_ = aluno; 
  
    const dateObject = new Date(data);
    aluno_.dtNascimento = dateObject;
    
    try {
      let response = await fetch(atualizarUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aluno_),
      });

      if (response.ok) {
        const updatedAluno: Aluno = await response.json();
        console.log("Aluno atualizado:", updatedAluno);

        // Busca o token de login existente
        const storedData = localStorage.getItem("loginToken");
        if (storedData) {
          const parsedData = JSON.parse(storedData);

          // Atualiza os detalhes do aluno dentro do token
          parsedData.userDetails = updatedAluno;

          // Salva o token atualizado de volta ao localStorage
          localStorage.setItem("loginToken", JSON.stringify(parsedData));
        }

        //Redirecionamento baseado no tipo de usuário
        router.push("/aluno");
      } else {
        const error = await response.json();
        console.error("Falha ao atualizar o perfil:", error);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Atualizar perfil
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label
              htmlFor="nome"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              Nome do aluno:
            </label>
            <Input
              type="text"
              id="nome"
              value={aluno.nome}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="cpf"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              CPF do aluno:
            </label>
            <Input
              type="text"
              id="cpf"
              value={aluno.cpf}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="dt_nascimento"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              Data de nascimento do aluno:
            </label>
            <input
              type="date"
              id="dt_nascimento"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="login"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              Login:
            </label>
            <Input
              type="text"
              id="login"
              value={aluno.login}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="senha"
              className="block mb-2 text-md font-medium text-gray-700"
            >
              Nova Senha:
            </label>
            <Input
              type="password"
              id="senha"
              value={aluno.senha}
              onChange={handleInputChange}
              minLength={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Atualizar
          </button>
        </form>
      </div>
    </main>
  );
}

export default EditarPerfilPage;
