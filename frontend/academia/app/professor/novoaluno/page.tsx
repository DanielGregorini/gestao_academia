"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/form/Input";
import Aluno from "@/utils/classes/aluno";

function NovoAluno() {
  const [novoAluno, setNovoAluno] = useState<Aluno>(
    new Aluno(0, 0, 0, '', '', new Date(), '', '')
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { id, value } = event.target;
    setNovoAluno({
      ...novoAluno,
      [id]: id === 'dt_nascimento' ? new Date(value) : value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // Implementar o cadastro do novo aluno
    console.log("Aluno cadastrado:", novoAluno);
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
            <Input
              type="date"
              id="dt_nascimento"
              value={novoAluno.dt_nascimento.toISOString().substring(0, 10)}
              onChange={handleInputChange}
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