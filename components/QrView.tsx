// components/QRViewer.tsx
"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import { setupApiClient } from "@/utils/api/fetchData";

export default function QRViewer({ children }: { children?: ReactNode }) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  async function fetchQr() {
    try {
      const api = setupApiClient({ url: "http://localhost:3000/api/" });
      const response = await api.get("default/auth/qr?format=image", {
        responseType: "arraybuffer",
      });

      // Se você quiser checar status bem aqui:
      if (response.status === 422) {
        setErrorStatus(422);
        return; // interrompe, não continua com blob etc
      }

      // Se chegou aqui, deu status 2xx ou similar
      setErrorStatus(null);

      const buffer = response.data;
      const blob = new Blob([buffer], { type: "image/png" });
      const objectUrl = URL.createObjectURL(blob);
      setQrSrc(objectUrl);
    } catch (err: any) {
      console.error("Erro ao buscar QR:", err);

      // Se for um erro HTTP (axios ou similar), você pode checar o “err.response.status”
      if (err.response && err.response.status === 422) {
        setErrorStatus(422);
      }
      // Senão outros erros que não são HTTP (rede, timeout etc), você pode tratá-los também
    }
  }

  useEffect(() => {
    fetchQr();

    // só programe intervalo se ainda não deu erro 422
    intervalRef.current = setInterval(() => {
      // se já detectamos erro 422, não refazer
      if (errorStatus === 422) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }
      fetchQr();
    }, 20000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // revogar URL da imagem
      if (qrSrc) URL.revokeObjectURL(qrSrc);
    };
  }, [errorStatus]); // atenção: errorStatus no array de dependências

  if (errorStatus === 422) {
    return <main>{children}</main>;
  }

  if (!qrSrc) {
    return <p>Carregando QR …</p>;
  }

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col space-y-2 items-center">
        <img src={qrSrc} alt="QR code WhatsApp" />
        <h1>Escaneie o QR code</h1>
      </div>
    </main>
  );
}
