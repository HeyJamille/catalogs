// Bibliotecas
import { Box, Container, Stack, Typography } from "@mui/material";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { TiClipboard } from "react-icons/ti";

export default function Welcome() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: { xs: "none", lg: "flex" },
        width: "50%",
        background:
          "linear-gradient(to bottom right, #155dfc, #1447e6, #1c398e)",
        position: "relative",
        overflow: "hidden",
        p: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/path-to-your-background-illustration.svg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 6,
          py: 4,
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: 36, fontWeight: "bold", mb: 1 }}
        >
          Bem-vindo de volta!
        </Typography>
        <Typography variant="h6" sx={{ color: "rgba(203,224,255,0.9)", mb: 4 }}>
          Gerencie seus catálogos, estoque e automações com praticidade.
        </Typography>

        <Stack spacing={3}>
          {[
            {
              title: "Acesso rápido",
              desc: "Entre em segundos e aproveite todos os recursos",
              icon: AiOutlineThunderbolt,
            },
            {
              title: "Gestão de estoque",
              desc: "Controle seus produtos com eficiência",
              icon: BsBox,
            },
            {
              title: "Catálogos digitais",
              desc: "Organize e compartilhe com facilidade",
              icon: TiClipboard,
            },
            {
              title: "Segurança garantida",
              desc: "Seus dados protegidos com criptografia",
              icon: CiLock,
            },
          ].map((item, idx) => (
            <Stack key={idx} direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <item.icon className="w-6 h-6" />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, mb: 0.3 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(203,224,255,0.9)" }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
