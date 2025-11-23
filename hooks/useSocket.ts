"use client";

// React
import { useEffect, useRef } from "react";

// Bibliotecas
import { io, Socket } from "socket.io-client";

export function useSocket(onNewMessage?: (payload: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const WS_URL = "http://localhost:3000";

    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

    const socket = io(WS_URL, {
      autoConnect: true,
      transports: ["websocket"],
      auth: token ? { token } : undefined,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket conectado id=", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket desconectado", reason);
    });

    if (onNewMessage) {
      socket.on("newMessage", onNewMessage);
    }

    socket.on("connect_error", (err) => {
      console.error("Erro conexão socket", err);
    });

    return () => {
      if (onNewMessage) socket.off("newMessage", onNewMessage);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [onNewMessage]);

  const emit = (event: string, data?: any) => {
    socketRef.current?.emit(event, data);
  };

  return {
    emit,
    getSocket: () => socketRef.current,
  };
}
