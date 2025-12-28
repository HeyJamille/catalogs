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
  lastMenssagem: itemsLastMessage;
}

export function TypeMenssagem({ name, lastMenssagem }: TypeMenssagemProps) {
  return (
    <span className="flex items-center space-x-1">
      <span className="whitespace-nowrap">
        {lastMenssagem.fromMe ? "Eu: " : name + ": "}
      </span>
      {lastMenssagem.type === "ptt" ? (
        <span className="flex items-center">
          <MdKeyboardVoice className="w-4 h-4 mx-1" /> Menssagem de voz
        </span>
      ) : lastMenssagem.type === "revoked" ? (
        <span className="flex items-center">
          <TbCancel className="w-4 h-4 mx-1" /> Menssagem apagada
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
        <span className="truncate max-w-xs">
          {lastMenssagem.body ? lastMenssagem.body : ""}
        </span>
      )}
    </span>
  );
}
