"use client";

// Bibliotecas
import { Button } from "@heroui/button";
import { Link } from "lucide-react";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-7xl font-extrabold text-purple-700 drop-shadow-lg">
        500
      </h1>
      <h2 className="text-3xl font-semibold mt-4 text-gray-800">
        Erro interno do servidor
      </h2>
      <p className="text-gray-600 mt-3 max-w-lg">
        Oops! Algo deu errado no nosso servidor. Tente novamente mais tarde ou
        entre em contato com o suporte se o problema persistir.
      </p>

      <Link href="/" className="mt-8">
        <Button className="px-6 py-3 rounded-full shadow-lg bg-purple-700 hover:bg-purple-800 transition-transform hover:scale-105">
          Voltar para a página inicial
        </Button>
      </Link>
    </div>
  );
}
