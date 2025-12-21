// Bibliotecas
import { Box, Container, Typography } from "@mui/material";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function NoMsgsSelected() {
  return (
    <Box display="flex" flexDirection="column" height="100vh" bgcolor="grey.50">
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Box
          sx={{
            position: "relative",
            mb: 4,
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              p: 3,
              borderRadius: "50%",
              bgcolor: "primary.main",
              boxShadow: "0 8px 32px rgba(25, 118, 210, 0.2)",
            }}
          >
            <HiOutlineChatBubbleLeftRight
              style={{
                width: "64px",
                height: "64px",
                color: "white",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                bgcolor: "success.main",
                borderRadius: "50%",
                p: 1.5,
                boxShadow: 2,
              }}
            >
              <BsChatDots
                style={{ width: "20px", height: "20px", color: "white" }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "140%",
              height: "140%",
              borderRadius: "50%",
              border: "2px dashed",
              borderColor: "primary.light",
              opacity: 0.3,
              animation: "pulse 3s ease-in-out infinite",
              "@keyframes pulse": {
                "0%, 100%": {
                  transform: "translate(-50%, -50%) scale(1)",
                  opacity: 0.3,
                },
                "50%": {
                  transform: "translate(-50%, -50%) scale(1.1)",
                  opacity: 0.1,
                },
              },
            }}
          />
        </Box>

        <Typography
          variant="h4"
          fontWeight={600}
          color="text.primary"
          gutterBottom
          sx={{ mb: 2 }}
        >
          Nenhuma conversa selecionada
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "500px", lineHeight: 1.7 }}
        >
          Selecione uma conversa da lista ao lado para começar a trocar
          mensagens ou inicie um novo chat
        </Typography>
      </Container>
    </Box>
  );
}
