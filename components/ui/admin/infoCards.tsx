// Bibliotecas
import { ArrowUp, Banknote } from "lucide-react";

// Tipagem

export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {["R$ 1.200,00", "R$ 2.500,00", "R$ 3.800,00"].map((valor, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-5"
        >
          <div className="absolute top-5 left-4 transform bg-[#3b82f6] text-gray-200 p-3 rounded-md">
            <Banknote className="w-6 h-6" />
          </div>
          <div className="ml-16">
            <p className="text-sm font-medium text-gray-500">
              Valor do estoque
            </p>
            <div className="flex items-center">
              <p className="text-lg font-bold text-gray-800">{valor}</p>
              <p className="ml-1 flex items-center text-xs font-semibold text-green-500">
                <ArrowUp className="w-[1.3em] h-[1.3em] text-green-400" />
                22%
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
