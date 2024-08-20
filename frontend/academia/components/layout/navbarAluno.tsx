import React from "react";
import Link from "next/link";

function NavbarAluno() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <div className="text-white text-xl font-bold">
        <Link href="/">logo</Link>
      </div>

      <div className="flex justify-around items-center w-1/3">
        <div className="text-white text-xl font-bold">
          <Link href="/aluno/meustreinos">Meus Treinos</Link>
        </div>
        {/* <div className="text-white text-xl font-bold">
          <Link href="/">dddddd</Link>
        </div>*/}
      </div>

      <div className="flex justify-end items-center w-1/3">
        <div className="text-white text-2xl px-3">ID: 9</div>

        <div className="bg-slate-100 p-4 rounded-xl text-md">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAluno;
