"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(onNewMessage?: (payload: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const WS_URL = "http://localhost:3000";
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

    const socket = io(WS_URL, {
      autoConnect: true,
      transports: ["websocket"], // você pode testar removendo esse forçamento
      auth: token ? { token } : undefined,
      timeout: 30000, // 30 segundos
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket conectado:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket desconectado:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error(
        "Erro na conexão do socket:",
        err,
        "mensagem:",
        err.message
      );
    });

    socket.on("reconnect_attempt", (attempt) => {
      console.log("Tentando reconectar, tentativa:", attempt);
    });

    socket.on("reconnect_failed", () => {
      console.error("Falha ao reconectar.");
    });

    socket.on("newMessage", (payload) => {
      if (onNewMessage) onNewMessage(payload);
    });

    return () => {
      if (onNewMessage) socket.off("newMessage", onNewMessage);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("reconnect_attempt");
      socket.off("reconnect_failed");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [onNewMessage]);

  const emit = (event: string, data?: any) => {
    socketRef.current?.emit(event, data);
  };

  return { emit, getSocket: () => socketRef.current };
}
