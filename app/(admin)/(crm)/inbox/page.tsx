// Componentes
import QRViewer from "@/components/QrView";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";
import { Divider } from "@heroui/react";
import Image from "next/image";

export default async function StockPage() {
  const api = setupApiClient({ url: "http://localhost:3000/api/" });

  const chats = await api.get(
    "http://localhost:3000/api/default/chats/overview?limit=20"
  );

  console.log("Dados: ", chats.data);

  return (
    <QRViewer>
      <div className="flex py-4 w-full gap-x-6">
        {/* Lista de Contatos */}
        <div className="w-1/4 bg-white shadow-lg rounded-2xl p-4">
          <header className="flex  justify-between items-center">
            <h2 className="text-xl font-semibold">Contatos</h2>
            <button className="text-blue-500 hover:underline">+ Novo</button>
          </header>

          <div className="px-1 py-2">
            <Divider />
          </div>

          <div className=" overflow-y-auto h-[750px] text-gray-800 p-4 space-y-4 rounded-xl ">
            <div className=" ">
              {chats.data.map((chat: any) => (
                <div
                  key={chat.id}
                  className="flex items-center gap-4 space-y-4  cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="relative">
                    <Image
                      src={
                        chat.picture ||
                        "https://placehold.co/100x100/ccc/fff?text=?"
                      }
                      alt={"PF"}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-gray-300 object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-gray-800 font-semibold truncate">
                      {chat.name}
                    </h2>
                    <p className="text-gray-600 text-sm truncate">
                      {chat.lastMessage?.body || "Sem mensagens ainda..."}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(
                      chat.lastMessage?.timestamp * 1000
                    ).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Área de Conversa */}
        <div className="flex-1 bg-white p-4 rounded-xl shadow-lg">
          {/* Aqui você pode adicionar o componente de conversa */}
        </div>
      </div>
    </QRViewer>
  );
}
