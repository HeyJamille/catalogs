"use client";

// React
import { useState } from "react";

// Bibliotecas
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { BsFillPersonPlusFill, BsFilter } from "react-icons/bs";

// Componentes
import ButtonIcon from "../btnIcons";
import SearchInput from "../../input/search";
import Alert from "../alert";
import ChatsOverviews from "@/components/templates/admin/chat/chatsOverviews";

// Tipagem
import { itemsChatOverviews } from "@/types/chatOverviews";

interface OverviewsProps {
  status: boolean;
  listChatOverviews: itemsChatOverviews[];
}

export default function Overviews({
  status,
  listChatOverviews,
}: OverviewsProps) {
  const [active, setActive] = useState("Individual");

  const options = ["Individual", "Grupos", "Canais", "Tags"];

  return (
    <Box
      sx={{
        width: "500px",
        height: "100vh",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        borderRight: 1,
        borderRightColor: "divider",
        pb: 9,
      }}
    >
      <Box sx={{ px: 2, py: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Conversas</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <ButtonIcon
              title="Adicionar Contato"
              icon={<BsFillPersonPlusFill className="w-5 h-5" />}
            />
            <ButtonIcon
              title="Filtros"
              icon={<BsFilter className="w-5 h-5" />}
            />
          </Box>
        </Box>

        <SearchInput />

        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          {options.map((label) => (
            <Button
              key={label}
              onClick={() => setActive(label)}
              variant={active === label ? "contained" : "outlined"}
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: active === label ? "600" : "400",
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ marginX: 1 }} />

      <Box
        sx={{
          overflowY: "auto",
          px: 0.8,
        }}
      >
        <Box
          sx={{
            overflowY: "auto",
            py: 1,
          }}
        >
          {!status && (
            <Alert error="error" description="Sessão foi desconectada" />
          )}
        </Box>
        <ChatsOverviews contacts={listChatOverviews} />
      </Box>
    </Box>
  );
}
