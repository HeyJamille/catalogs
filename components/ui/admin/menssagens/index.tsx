"use client";

// Bibliotecas
import { Box } from "@mui/material";

// Componentes
import NoMsgsSelected from "../noMsgsSelected";
import HeaderChat from "@/components/templates/admin/chat/headerChat";
import BodyChat from "@/components/templates/admin/chat/bodyChat";
import FooterChat from "@/components/templates/admin/chat/footerChat";

// Tipagem
import { itemsDetailChats } from "@/types/chatOverviews";
import { itemsContacts } from "@/types/contacts";

interface MenssagensProps {
  contacts?: itemsContacts;
  msgs?: itemsDetailChats[];
}

export default function Menssagens({ contacts, msgs }: MenssagensProps) {
  if (msgs === undefined) {
    return <NoMsgsSelected />;
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <HeaderChat contacts={contacts} />

      <Box
        flex={1}
        overflow="auto"
        p={2}
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          overflowX: "hidden",
          gap: 2,
        }}
      >
        {msgs.map((msg, index) => (
          <BodyChat msg={msg} key={index} />
        ))}
      </Box>

      <Box
        component="footer"
        bgcolor="common.white"
        p={2}
        mb={7}
        borderTop={1}
        borderColor="divider"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <FooterChat />
        </Box>
      </Box>
    </Box>
  );
}
