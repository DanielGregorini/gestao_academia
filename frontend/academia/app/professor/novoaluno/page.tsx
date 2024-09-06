"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Input from "@/components/form/Input";
import Aluno from "@/utils/classes/aluno";
import { useRouter } from "next/navigation";

function NovoAluno() {
  const router = useRouter();

  const [novoAluno, setNovoAluno] = useState<Aluno>(new Aluno());
  const [data, setData] = useState<string>('2003-01-01');

  useEffect(() => {
    const storedData = localStorage.getItem("loginToken");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const idProfessor: number = parsedData.userDetails
        ? parsedData.userDetails.idProfessor
        : null;
      let aluno = novoAluno;
      aluno.idProfessor = idProfessor;
      aluno.dtNascimento = new Date();
      aluno.idAcademia = 1;
      setNovoAluno(aluno);
    } else {
      router.push("/login");
    }
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    console.log(id, " ", value);
    if (id === "dt_nascimento") {
      setNovoAluno((prev) => {
        const updatedAluno = {
          ...prev,
          [id]: new Date(value),
        };
        console.log("Updated Date:", updatedAluno[id]);
        return updatedAluno;
      });
    } else {
      setNovoAluno((prev) => {
        const updatedAluno: any = {
          ...prev,
          [id]: value,
        };
        console.log("Updated Value:", updatedAluno[id]);
        return updatedAluno;
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let novoAluno_ = novoAluno;
    const dateObject = new Date(data);
    novoAluno_.dtNascimento = dateObject;

    console.log("Aluno cadastrado:", novoAluno);

    const backendUrl =
      (await process.env.BACKEND_URL) || "http://localhost:5298";

    let atualizarUrl = `${backendUrl}/aluno/`;

    try {
      let response = await fetch(atualizarUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoAluno),
      });

      if (response.ok) {
        const alunoCriado: Aluno = await response.json();
        console.log("novo aluno:", alunoCriado);

        setNovoAluno(new Aluno());
        alert("Aluno cadastrado");
        router.push("/professor/meusalunos");
      } else {
        const error = await response.json();
        console.error("Falha ao atualizar o perfil:", error);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    let aluno = novoAluno;

    aluno.dtNascimento = new Date(newDate);
    setNovoAluno(aluno);

    console.log("Data selecionada:", newDate);
    console.log("Data selecionada:", aluno);
    // Adicione mais lógica aqui conforme necessário
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Cadastro de novo aluno
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
              value={novoAluno.nome}
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
              value={novoAluno.cpf}
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
              id="dateInput"
              value={data}
              onChange={(e) => {setData(e.target.value)}}
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
              value={novoAluno.login}
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
              Senha:
            </label>
            <Input
              type="password"
              id="senha"
              value={novoAluno.senha}
              onChange={handleInputChange}
              required
              minLength={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default NovoAluno;
