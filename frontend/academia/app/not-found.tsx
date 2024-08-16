// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Desculpe, a página que você está procurando não existe.</p>
      <Link href="/" legacyBehavior>
        <a className="text-blue-500 text-lg">Voltar para a página inicial</a>
      </Link>
    </div>
  );
}