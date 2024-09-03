"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Importando o useRouter de 'next/router'
import type { NextPage } from "next"; // Para definir o tipo da página como NextPage
import LoginData from "@/utils/types/loginData";


const LoginPage: NextPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter(); // Instância do useRouter para navegação

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5298";
    let loginUrl = `${backendUrl}/aluno/login`;

    try {
      let response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Login: username,
          Senha: password,
        }),
      });

      if (!response.ok) {
        loginUrl = `${backendUrl}/professor/login`;
        response = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Login: username,
            Senha: password,
          }),
        });
      }

      if (response.ok) {
        const data: LoginData = await response.json(); // Supondo que data inclua `token` e informações do usuário
        const userType = loginUrl.includes("aluno") ? "Aluno" : "Professor";

        // Salva no localStorage informações do token e do usuário
        console.log(data)
        if (userType == "Aluno") {

          let aluno = data.aluno;

          localStorage.setItem(
            "loginToken",
            JSON.stringify({
              token: data.token,
              userType: userType,
              userDetails: aluno,  
            })
          );
        } else {

          let professor = data.professor;



          localStorage.setItem(
            "loginToken",
            JSON.stringify({
              token: data.token,
              userType: userType,
              userDetails: professor, // Adicionando detalhes do usuário para serem salvos
            })
          );
        }

        //Redirecionamento baseado no tipo de usuário
        router.push(userType === "Aluno" ? "/aluno" : "/professor");
      } else {
        const error = await response.json();
        console.error("Login failed:", error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="min-w-96">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Login Academia
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Nome de Usuário:
              </label>
              <input
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
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Senha:
              </label>
              <input
                type="password"
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
      </div>
    </main>
  );
};

export default LoginPage;
