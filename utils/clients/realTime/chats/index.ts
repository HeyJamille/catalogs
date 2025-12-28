"use client";

// Next
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Bibliotecas
import { io } from "socket.io-client";

export default function ChatClient({ session }: { session: string }) {
  const router = useRouter();

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socket.emit("join_session", { sessionName: session });

    socket.on("new_message", () => {
      router.refresh();
    });

    return () => {
      socket.off("new_message");
      socket.disconnect();
    };
  }, [session]);

  return null;
}
