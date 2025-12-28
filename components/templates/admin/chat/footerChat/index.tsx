// Next
import { useRouter, useSearchParams } from "next/navigation";

// Componentes
import ButtonIcon from "@/components/ui/admin/btnIcons";

// Bibliotecas
import { Paper, TextareaAutosize } from "@mui/material";
import { GoPaperclip } from "react-icons/go";
import { VscSend } from "react-icons/vsc";
import Cookies from "js-cookie";

// React
import { useState } from "react";

// Utils
import { setupApiClient } from "@/utils/api";

export default function FooterChat() {
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const token = Cookies.get("auth_token");
  const session = Cookies.get("session_id");
  const api = setupApiClient({ token });
  const chatId = useSearchParams().get("chatId");
  const router = useRouter();

  async function handleSubmitMsg() {
    setLoading(true);

    await api.post(`/wpps/session/${session}/chat/sendmsg/${chatId}`, { msg });
    setMsg("");
    router.refresh();

    setLoading(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (msg.trim()) {
        handleSubmitMsg();
        setMsg("");
      }
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: 1,
        border: 1,
        borderColor: "grey.300",
        borderRadius: 2,
        px: 2,
        py: 1,
        "&:focus-within": {
          borderColor: "primary.main",
        },
      }}
    >
      <TextareaAutosize
        minRows={2}
        placeholder="Type a message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          resize: "none",
          fontSize: "1rem",
        }}
      />

      <ButtonIcon
        title="Enviar Arquivos"
        icon={<GoPaperclip className="w-5 h-5" />}
      />

      <ButtonIcon
        title="Enviar Menssagem"
        icon={<VscSend className="w-5 h-5" />}
        handleAction={() => handleSubmitMsg()}
        loading={loading}
      />
    </Paper>
  );
}
