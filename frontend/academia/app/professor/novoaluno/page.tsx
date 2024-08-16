"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "@/components/form/Input";

function NovoAluno() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    //implementar o cadastro
    
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
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
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Nome do aluno:
            </label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="cpf"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              CPF do aluno:
            </label>
            <Input
              type="text"
              id="cpf"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="data_de_nascimento"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Data de nascimento do aluno:
            </label>
            <Input
              type="date"
              id="data_de_nascimento"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="login"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              CPF do aluno:
            </label>
            <Input
              type="text"
              id="login"
              value={username}
              onChange={handleUsernameChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="login"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Login:
            </label>
            <Input
              type="text"
              id="login"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Senha:
            </label>
            <Input
              type="text"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default NovoAluno;
