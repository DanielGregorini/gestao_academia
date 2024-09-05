import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <div className="text-white text-xl font-bold">
        <Link href="/">logo</Link>
      </div>

      <div className="flex justify-between items-center w-1/4">
        <div className="text-white text-xl font-bold">
          <Link href="/professor">Professor</Link>
        </div>

        <div className="text-white text-xl font-bold">
          <Link href="/aluno">Aluno</Link>
        </div>

        <div className="bg-slate-100 p-4 rounded-xl text-md">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;