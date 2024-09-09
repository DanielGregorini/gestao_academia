"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams } from "next/navigation";
import Treino from "@/utils/classes/treino";
import TreinoCard from "@/components/treino/treinoCard";
import Input from "@/components/form/Input";
import AlunoId from '../../../../components/aluno/alunoId';

const MeusAlunosIdPage = () => {
  const params = useParams();
  const { id } = params;

  let alunoId: number;

    if (Array.isArray(id)) {
        // Se id for array, pegue o primeiro elemento
        alunoId = parseInt(id[0], 10);
    } else {
        // Se id for uma string simples, converta diretamente
        alunoId = parseInt(id, 10);
    }

  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [novoTreino, setNovoTreino] = useState(false);
  const [treino, setTreino] = useState(
    new Treino(parseInt(id[0], 10), "A", "", "")
  );

  const [editTreino, setEditTreino] = useState(false);
  const [treinoSelecionado, setTreinoSelecionado] = useState<Treino>();

  useEffect(() => {
    fetchTreinos();
  }, []);

  async function fetchTreinos() {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    let treinosUrl = `${backendUrl}/treino/aluno/${id}`;
    let token: any;
    const storedData = localStorage.getItem("loginToken");

    if (storedData) {
      const parsedData = await JSON.parse(storedData);
      token = parsedData.token;
    } else {
    }

    try {
      let response = await fetch(treinosUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  //-----add treino ----------------------///////////////////////////
  const handleInputChangeAdd = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setTreino({
      ...treino,
      [id]: value,
    });
  };

  const handleSubmitAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    let atualizarUrl = `${backendUrl}/treino/`;

    
    let treino_ = treino;
    treino_.idAluno = alunoId;

    console.log(treino_)

    try {
      let response = await fetch(atualizarUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(treino_),
      });

      if (response.ok) {
        const novoTreino_: Treino = await response.json();
        console.log("Novo Treino:", novoTreino_);

        setTreinos([...treinos, novoTreino_]);
        setTreino(new Treino(parseInt(id[0], 10), "A", "", ""));
      } else {
        const error = await response.json();
        console.error("Falha ao acriar novo treino:", error);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }

    setNovoTreino(false);
    setEditTreino(false);
  };

  //-----put treino ----------------------///////////////////////////

  const onClickPut = (idTreino: number): void => {
    console.log(idTreino);

    const treinoEncontrado = treinos.find(
      (treino) => treino.idTreino === idTreino
    );

    if (treinoEncontrado) {
      setTreinoSelecionado(treinoEncontrado);
      console.log(`Treino selecionado: ${treinoEncontrado.idTreino}`);
    } else {
      console.log("Nenhum treino encontrado com esse ID");
      return;
    }
    setNovoTreino(false);
    setEditTreino(true);
  };

  const handleInputChangePut = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    setTreinoSelecionado({
      ...treinoSelecionado,
      [id]: value,
    });
  };

  const handleSubmitPut = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    let atualizarUrl = `${backendUrl}/treino/${treinoSelecionado?.idTreino}`;

    try {
      let response = await fetch(atualizarUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(treinoSelecionado),
      });

      if (response.ok) {
        const treinoAtualizado: Treino = await response.json();
        console.log("Treino atualizado:", treinoAtualizado);

        const indice = treinos.findIndex(
          (treino) => treino.idTreino === treinoAtualizado.idTreino
        );

        if (indice === -1) {
          console.log("Treino não encontrado.");
          return;
        }

        // Cria uma nova lista com o treino atualizado
        const novosTreinos = treinos;
        novosTreinos[indice] = treinoAtualizado;
        setTreinos(novosTreinos);

        setTreinoSelecionado(undefined);
      } else {
        const error = await response.json();
        console.error("Falha ao acriar novo treino:", error);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }

    setNovoTreino(false);
    setEditTreino(false);
  };

  //-----delete treino ----------------------///////////////////////////

  const onClickDelete = async (idTreino: number) => {
    console.log("onClickDelete chamadaaaaaaaa");
    console.log(idTreino);

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    let deleteUrl = `${backendUrl}/treino/${idTreino}`;

    try {
      let response = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
  
        window.location.reload();

      } else {
        const error = await response.json();
        console.error("Falha ao acriar novo treino:", error);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };


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
      <h1 className="text-center my-10 text-2xl">Aluno ID: {id}</h1>
      <div className="flex flex-wrap justify-center">
        {treinos.map((treino) => (
          <TreinoCard treino={treino} 
          key={treino.idTreino}
          onClickPut={onClickPut} 
          onClickDelete={onClickDelete}
          />
        ))}
        {!novoTreino && (
          <button
            onClick={() => {
              setNovoTreino(true);
              setEditTreino(false);
            }}
            className="bg-slate-50 w-1/4 mx-5 p-4 rounded-lg shadow-md' h-52 my-4 text center flex justify-center items-center"
          >
            <div className="">
              <p className="w-full">+ NOVO TREINO </p>
            </div>
          </button>
        )}
      </div>
      {novoTreino && (
        <div className="flex justify-center mt-10 w-full">
          <form
            onSubmit={handleSubmitAdd}
            className="space-y-4 flex-wrap justify-center"
          >
            <div className="form-group">
              <label
                htmlFor="letra"
                className="block mb-2 text-md font-medium text-gray-700"
              >
                Letra do treino:
              </label>
              <Input
                type="text"
                id="letra"
                value={treino.letra}
                onChange={handleInputChangeAdd}
                required
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="diaSemana"
                className="block mb-2 text-md font-medium text-gray-700"
              >
                dia da Semana:
              </label>
              <Input
                type="text"
                id="diaSemana"
                value={treino.diaSemana}
                onChange={handleInputChangeAdd}
                required
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="listaExercicios"
                className="block mb-2 text-md font-medium text-gray-700"
              >
                Lista de exercicios {"(separar por ;)"}:
              </label>
              <Input
                type="text"
                id="listaExercicios"
                value={treino.listaExercicios}
                onChange={handleInputChangeAdd}
                required
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              >
                Criar novo Treino
              </button>
            </div>
          </form>
        </div>
      )}

      {editTreino && (
        <div className="flex justify-center mt-10 w-full">
          <form
            onSubmit={handleSubmitPut}
            className="space-y-4 flex-wrap justify-center"
          >
            <h1 className="text-center text-3xl">
              Editar treino ID:{treinoSelecionado?.idTreino}
            </h1>
            <div className="form-group">
              <label
                htmlFor="letra"
                className="block mb-2 text-md font-medium text-gray-700"
              >
                Letra do treino:
              </label>
              <Input
                type="text"
                id="letra"
                value={treinoSelecionado?.letra}
                onChange={handleInputChangePut}
                required
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="diaSemana"
                className="block mb-2 text-md font-medium text-gray-700"
              >
                dia da Semana:
              </label>
              <Input
                type="text"
                id="diaSemana"
                value={treinoSelecionado?.diaSemana}
                onChange={handleInputChangePut}
                required
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="listaExercicios"
                className="block mb-2 text-md font-medium text-gray-700"
              >
                Lista de exercicios {"(separar por ;)"}:
              </label>
              <Input
                type="text"
                id="listaExercicios"
                value={treinoSelecionado?.listaExercicios}
                onChange={handleInputChangePut}
                required
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
              >
                Editar Treino
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default MeusAlunosIdPage;
