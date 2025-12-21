"use client";

// React
import { useState } from "react";

// Bibliotecas
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Paper,
  Stack,
} from "@mui/material";
import { GoPaperclip, GoTag } from "react-icons/go";
import { IoIosInformationCircleOutline, IoIosSearch } from "react-icons/io";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { VscSend } from "react-icons/vsc";

// Componentes
import ButtonIcon from "../btnIcons";
import NoMsgsSelected from "../noMsgsSelected";

export default function Menssagens() {
  const [detailMsg, setDetailMsg] = useState<string[]>([]);

  if (detailMsg.length === 0) {
    return <NoMsgsSelected />;
  }

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <Toolbar sx={{ width: "100%", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              sx={{ width: 44, height: 44 }}
            />
            <Box>
              <Typography variant="subtitle1" color="text.primary">
                Sarah Anderson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Online
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={1}>
            <ButtonIcon
              title="Pesquisar"
              icon={<IoIosSearch className="w-5 h-5" />}
            />
            <ButtonIcon title="Tags" icon={<GoTag className="w-5 h-5" />} />
            <ButtonIcon
              title="Info"
              icon={<IoIosInformationCircleOutline className="w-5 h-5" />}
            />
          </Stack>
        </Toolbar>
      </AppBar>

      <Box flex={1} overflow="auto" p={2}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box display="flex" alignItems="start" gap={2}>
            <Avatar
              src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=U"
              sx={{ width: 36, height: 36 }}
            />
            <Paper
              sx={{
                p: 2,
                maxWidth: "60%",
                borderRadius: 3,
                boxShadow: 1,
              }}
            >
              <Typography>Hey Bob, how's it going?</Typography>
            </Paper>
          </Box>

          <Box
            display="flex"
            alignItems="start"
            justifyContent="flex-end"
            gap={2}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: "60%",
                borderRadius: 3,
                boxShadow: 1,
                bgcolor: "primary.main",
                color: "common.white",
              }}
            >
              <Typography>
                Hi Alice! I'm good, just finished a great book. How about you?
              </Typography>
            </Paper>
            <Avatar
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ME"
              sx={{ width: 36, height: 36 }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        component="footer"
        bgcolor="common.white"
        p={2}
        borderTop={1}
        borderColor="divider"
      >
        <Box display="flex" alignItems="center" gap={1}>
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
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
