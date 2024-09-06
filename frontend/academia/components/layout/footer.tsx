import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-slate-700 text-white p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Logo</h2>
          <p>Futura logo da academia aqui.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Sobre o Sistema</h2>
          <p>O sistema da academia permite aos usuários gerenciar suas atividades, acompanhar progressos e manter-se atualizados com as últimas notícias e eventos da academia.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Siga-nos</h2>
          <ul>
            <li><a href="#!" className="hover:text-gray-300">Facebook</a></li>
            <li><a href="#!" className="hover:text-gray-300">Instagram</a></li>
            <li><a href="#!" className="hover:text-gray-300">Twitter</a></li>
            <li><a href="#!" className="hover:text-gray-300">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
