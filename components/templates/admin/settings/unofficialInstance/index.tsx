"use client";

// Next
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Componentes
import Alert from "@/components/ui/admin/alert";
import { CardContainer, CardHeader } from "@/components/ui/admin/card";

// Bibliotecas
import { Box, Stack, Typography } from "@mui/material";

// Tipagem
interface UnofficialInstanceProps {
  qrCode?: string | any;
}

export default function UnofficialInstance({
  qrCode,
}: UnofficialInstanceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function removeParams() {
    const params = new URLSearchParams(searchParams.toString());

    const newUrl = params.toString() && pathname;

    router.replace(newUrl);
  }

  return (
    <CardContainer>
      <Stack spacing={2}>
        <CardHeader title="WhatsApp Web" type="close" close={removeParams} />

        <Alert description="Não conecte um número recém-criado ao WhatsApp Web. Use um número ativo há pelo menos uma semana com conversas reais para reduzir risco de bloqueio." />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          border={1}
          borderColor="grey.300"
          borderRadius="12px"
          p={2}
          sx={{ bgcolor: "grey.50" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img
              src={qrCode ?? ""}
              className={qrCode.message && `hidden`}
              alt="QR Code WhatsApp"
              style={{
                width: "220px",
                height: "220px",
              }}
            />

            <Box sx={{ display: "none" }}>
              <Typography variant="h6" color="success.main" textAlign="center">
                Instância conectada com sucesso!
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                mt={1}
              >
                Você pode começar a usar sua instância normalmente.
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={1}
            py={2}
          >
            {qrCode.message
              ? "Conectado"
              : "Abra o WhatsApp no seu telefone e escaneie o QR Code para conectar."}
          </Typography>
        </Box>
      </Stack>
    </CardContainer>
  );
}
