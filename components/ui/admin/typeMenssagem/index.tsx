"use client";

// Bibliotecas
import { MdKeyboardVoice } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import { PiStickerLight } from "react-icons/pi";
import { FaRegImages } from "react-icons/fa";

// Tipagem
import { itemsLastMessage } from "@/types/chatOverviews";

interface TypeMenssagemProps {
  name?: string;
  lastMenssagem: itemsLastMessage | null;
}

export function TypeMenssagem({ name, lastMenssagem }: TypeMenssagemProps) {
  // Se não houver mensagem, retorna um placeholder
  if (!lastMenssagem) {
    return <span className="text-gray-400">Nenhuma mensagem</span>;
  }

  return (
    <span className="flex items-center space-x-1">
      <span className="whitespace-nowrap">
        {lastMenssagem.fromMe ? "Eu: " : (name || "Desconhecido") + ": "}
      </span>
      {lastMenssagem.type === "ptt" ? (
        <span className="flex items-center">
          <MdKeyboardVoice className="w-4 h-4 mx-1" /> Mensagem de voz
        </span>
      ) : lastMenssagem.type === "revoked" ? (
        <span className="flex items-center">
          <TbCancel className="w-4 h-4 mx-1" /> Mensagem apagada
        </span>
      ) : lastMenssagem.type === "sticker" ? (
        <span className="flex items-center">
          <PiStickerLight className="w-4 h-4 mx-1" /> Sticker
        </span>
      ) : lastMenssagem.type === "image" ? (
        <span className="flex items-center">
          <FaRegImages className="w-4 h-4 mx-1" /> Imagem
        </span>
      ) : (
        <span className="truncate max-w-xs">{lastMenssagem.body || ""}</span>
      )}
    </span>
  );
}
