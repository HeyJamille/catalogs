"use client";

import CardContainer from "@/components/ui/admin/card";
import SearchInput from "@/components/ui/input/search";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { CiCircleInfo } from "react-icons/ci";
import { FiPlus, FiSearch } from "react-icons/fi";

export default function Channel() {
  return (
    <Box
      minHeight="100vh"
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

          {/* Empty state */}
          <Box
            textAlign="center"
            color="text.secondary"
            py={6}
            border="1px dashed"
            borderColor="grey.300"
            borderRadius={2}
          >
            <Typography variant="body2">Nenhum canal conectado</Typography>
          </Box>
        </Stack>
      </CardContainer>
    </Box>
  );
}
