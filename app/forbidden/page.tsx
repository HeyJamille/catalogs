// Bibliotecas
import { Lock } from "lucide-react";

// Next
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <article className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <Lock className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Acesso Negado</h1>
        <p className="text-gray-600 mb-6">
          Você não tem permissão para acessar esta página. Entre em contato com
          o administrador para obter acesso.
        </p>

        <Link
          href="/catalogo"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Voltar para a página inicial
        </Link>
      </section>
    </article>
  );
}
