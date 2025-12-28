// Bibliotecas
import { CiLock } from "react-icons/ci";
import { IoIosAlert } from "react-icons/io";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <IoIosAlert className="w-10 h-10 text-amber-500 animate-pulse" />
          </div>

          {/* 🧠 Título mais forte */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Em Breve ✨
          </h1>

          <div className="w-28 h-1 bg-blue-500 mx-auto rounded-full mb-2"></div>

          {/* 📣 Mensagem principal */}
          <p className="text-lg text-gray-700 mb-8">
            Estamos preparando algo incrível para você. Fique por aqui vale a
            pena!
          </p>

          <div className="bg-blue-50 rounded-md p-5 mb-8 border border-blue-200">
            <div className="flex items-center justify-center gap-3 text-blue-700">
              <CiLock size={28} className="animate-spin-slow" />
              <span className="text-base font-semibold">
                Atualização em andamento...
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-6">
            {["delay-0", "delay-200", "delay-400"].map((delay) => (
              <div
                key={delay}
                className={`w-3 h-3 bg-blue-600 rounded-full animate-pulse ${delay}`}
              ></div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mb-6">
            Obrigado pela sua paciência. Estamos empenhados em entregar algo que
            vale a pena ✨
          </p>

          {/* 🧩 Rodapé com nuance humanizada */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              Nossa equipe está totalmente focada em oferecer o melhor para
              você.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
