"use client";

// Nxt
import { useRouter } from "next/navigation";

// Componentes
import ChatContacts from "./chatsContacts";
import ListChats from "./listChats";

// Hook
import { useSocket } from "@/hooks/useSocket";

// Utils
import { setupApiClient } from "@/utils/api/fetchData";

// React
import { useCallback, useEffect, useState } from "react";

// Tipagem
import { ChatsItem } from "@/types/chats";
import { MessagesItem } from "@/types/chatMenssages";

interface ChatsProps {
  chatsOverview: ChatsItem[];
  messages?: MessagesItem[];
}

export default function ChatsContainer({
  chatsOverview,
  messages,
}: ChatsProps) {
  const router = useRouter();

  useSocket(
    useCallback(() => {
      router.refresh();
    }, [router])
  );

  return (
    <main className="w-full py-4 space-x-4 overflow-hidden flex">
      <ChatContacts chatsOverview={chatsOverview} />

      <aside className="flex-1 flex-col">
        <ListChats messages={messages} />
      </aside>
    </main>
  );
}
