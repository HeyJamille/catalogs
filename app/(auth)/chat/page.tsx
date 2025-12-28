// Componentes
import Menssagens from "@/components/ui/admin/menssagens";
import Overviews from "@/components/ui/admin/overviews";

// Utils
import { setupApiClient } from "@/utils/api";
import ChatClient from "@/utils/clients/realTime/chats";

// Next
import { cookies } from "next/headers";

export default async function Inbox({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  const session = (await cookieStore).get("session_id")?.value;
  const search = await searchParams;

  const api = setupApiClient({ token: token });
  const status = (await api.get(`/wpps/session/${session}/status`)).data
    .isConnected;
  const chatOverviews = (await api.get(`/wpps/session/${session}/chat`)).data
    .chats;

  let msgs;
  let contact;

  if (search.chatId) {
    const chatDetail = (
      await api.get(`/wpps/session/${session}/chat/${search.chatId}`)
    ).data.chats;
    const deatilContact = (
      await api.get(`/wpps/session/${session}/contact/${search.chatId}`)
    ).data.contact;

    msgs = chatDetail;
    contact = deatilContact;
  }

  return (
    <>
      <ChatClient session={session ?? ""} />
      <Overviews status={status} listChatOverviews={chatOverviews} />
      <main className="flex-1 w-full flex flex-col overflow-hidden">
        <Menssagens contacts={contact} msgs={msgs} />
      </main>
    </>
  );
}
