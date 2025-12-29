// Componentes
import { CardContainer } from "@/components/ui/admin/card";
import SearchInput from "@/components/ui/input/search";

// Bibliotecas
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CiCircleInfo } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { FaPlugCircleCheck } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

// Next
import Link from "next/link";
import { cookies } from "next/headers";

// Utils
import { setupApiClient } from "@/utils/api";
import { formatPhone } from "@/utils/mask/phone/";

export default async function Channel() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  const session = (await cookieStore).get("session_id")?.value;
  const api = setupApiClient({ token });

  const status = await api.get(`/wpps/session/${session}/status`);

  return (
    <Box
      maxHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      width="100%"
      pt={2}
    >
      <CardContainer>
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="subtitle1"
              className="text-gray-700 font-semibold"
              sx={{ color: "#364153", fontWeight: 600 }}
            >
              Canais de Atendimento
            </Typography>

            <Link href="/settings/channel/new/wpps">
              <Button
                variant="contained"
                color="success"
                size="medium"
                startIcon={<FiPlus className="w-4 h-4" />}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  bgcolor: "oklch(72.3% 0.219 149.579)",
                  "&:hover": { bgcolor: "oklch(62.7% 0.194 149.214)" },
                  fontSize: "14px",
                }}
              >
                Novo Canal
              </Button>
            </Link>
          </Box>

          <Box
            display="flex"
            gap={2}
            alignItems="center"
            bgcolor="grey.100"
            border="1px solid"
            borderColor="grey.200"
            borderRadius="8px"
            p={2}
          >
            <CiCircleInfo className="text-gray-500 w-10 h-10" />
            <Typography variant="body2" color="text.secondary">
              Conecte seu WhatsApp para que seus clientes possam entrar em
              contato diretamente com sua empresa.
            </Typography>
          </Box>

          <SearchInput />

          <Box
            sx={{
              textAlign: "center",
              color: "text.secondary",
              py: 2,
              px: 2,
              border: "1px dashed",
              borderColor: "grey.300",
              borderRadius: 2,
            }}
          >
            {/* <Typography variant="body2">Nenhum canal conectado</Typography> */}

            <Box
              sx={{
                backgroundColor: "grey.100",
                p: 1,
                borderRadius: 1,
                display: status.data.isConnected ? "flex" : "none",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#25D366",
                  borderRadius: "50%",
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaWhatsapp className="w-5 h-5" color="#fff" />
              </Box>

              <Box>
                <Typography fontSize="14px" fontWeight={600}>
                  {status.data.sessionName}
                </Typography>
                <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                  {status.data.id &&
                    formatPhone("+" + status.data.id.replace(/\D/g, ""))}
                </Typography>
              </Box>

              <Tooltip title={status.data.status} arrow>
                <IconButton>
                  <FaPlugCircleCheck className="w-6 h-6" color="#22C55E" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Stack>
      </CardContainer>
    </Box>
  );
}
