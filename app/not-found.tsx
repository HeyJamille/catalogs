// Icon
import { Button } from "@heroui/button";

// Biblioteca
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Title */}
      <h1 className="text-7xl font-extrabold text-gray-800 drop-shadow-lg">
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-800">
        Página não encontrada
      </h2>
      <p className="text-gray-600 mt-3 max-w-lg">
        Ops! Parece que a página que você procura não existe, foi removida ou
        está temporariamente indisponível.
      </p>

      {/* Button */}
      <Link href="/" className="mt-8">
        <Button className="px-6 py-3 rounded-full shadow-lg text-white bg-black hover:bg-gray-800 transition-transform hover:scale-105">
          Voltar para a página inicial
        </Button>
      </Link>
    </div>
  );
}
