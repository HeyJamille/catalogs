// Componentes
import Alert from "@/components/ui/admin/alert";
import { CardContainer, CardHeader } from "@/components/ui/admin/card";

// Bibliotecas
import { Box, Stack, Typography } from "@mui/material";
import { BsQrCode } from "react-icons/bs";

export default function UnofficialInstance({
  setClose,
}: {
  setClose: () => void;
}) {
  return (
    <CardContainer>
      <Stack spacing={3}>
        <CardHeader title="WhatsApp Web" type="close" close={setClose} />

        <Alert description="Não conecte um número recém-criado ao WhatsApp Web. Use um número ativo há pelo menos uma semana com conversas reais para reduzir risco de bloqueio." />

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          border={1}
          borderColor="grey.300"
          borderRadius="12px"
          p={4}
          sx={{ bgcolor: "grey.50" }}
        >
          <BsQrCode size={120} color="#6b7280" />

          <Typography
            variant="subtitle1"
            color="text.primary"
            fontWeight={500}
            mt={2}
            textAlign="center"
          >
            Aponte sua câmera para o QR Code
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mt={1}
            px={2}
          >
            Abra o WhatsApp no seu telefone e escaneie o QR Code para conectar.
          </Typography>
        </Box>
      </Stack>
    </CardContainer>
  );
}
