// Componentes
import ChatsContainer from "@/components/templates/chats";
import QrWhatsapp from "@/components/templates/qrWhatsapp";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";

export default async function Chats({
  searchParams, // ele é uma Promise agora
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const api = setupApiClient({});
  const img_qr = await api.get("/chats/auth/qr");

  const awaitedSearch = await searchParams;
  const id = awaitedSearch.id;

  if (img_qr.data.status !== "connected") {
    return <QrWhatsapp img_qr={img_qr.data.qr} />;
  }

  const chats = await api.get("/chats/overview?total=20");

  let chatById;
  if (id && typeof id === "string") {
    try {
      const res = await api.get(`/chats/${id}`);
      chatById = res.data;
    } catch (err) {
      console.error("Erro ao buscar mensagens do chat:", err);
    }
  }

  return (
    <ChatsContainer
      chatsOverview={chats.data.chats}
      messages={chatById?.messages}
    />
  );
}
