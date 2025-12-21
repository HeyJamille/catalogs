// Componentes
import Alert from "@/components/ui/admin/alert";
import CardContainer from "@/components/ui/admin/card";

// Bibliotecas
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { BiChevronLeft } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function Wpps() {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      width="100%"
      pt={2}
      gap={4}
      overflow={"auto"}
    >
      <CardContainer>
        <Stack spacing={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                minWidth: 0,
                p: "7px",
                borderRadius: "50%",
                color: "grey.600",
                borderColor: "grey.300",
                "&:hover": {
                  backgroundColor: "grey.100",
                  borderColor: "grey.400",
                },
              }}
            >
              <BiChevronLeft className="w-5 h-5" />
            </Button>

            <Typography
              sx={{ color: "#364153", fontSize: "19px", fontWeight: 600 }}
            >
              WhatsApp
            </Typography>
          </Box>

          <Alert
            description="Escolha como deseja conectar seu WhatsApp. Algumas opções podem
            estar indisponíveis."
          />

          <Grid
            container
            spacing={2}
            columns={16}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Tooltip title={"WhatsApp Official está em desenvolvimento."} arrow>
              <Grid size={8}>
                <Card
                  variant="outlined"
                  sx={{
                    pointerEvents: true ? "none" : "auto",
                    opacity: true ? 0.5 : 1,
                    height: "100%",
                    textAlign: "center",
                    borderRadius: "8px",
                    cursor: true ? "default" : "pointer",
                    transition: "transform 0.15s ease-in-out",
                    "&:hover": {
                      transform: true ? "none" : "translateY(-3px)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      py: 5,
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      pb={2}
                    >
                      <Box>
                        <FaWhatsapp className="w-12 h-12" color="#25D366" />
                      </Box>
                    </Box>

                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "17px",
                        color: "#4a5565",
                      }}
                    >
                      WhatsApp Official
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Tooltip>

            <Grid size={8}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    py: 5,
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    pb={2}
                  >
                    <Box>
                      <BsQrCode className="text-gray-500 w-12 h-12" />
                    </Box>
                  </Box>

                  <Typography
                    sx={{ fontWeight: 600, fontSize: "17px", color: "#4a5565" }}
                  >
                    WhatsApp Web
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </CardContainer>

      <CardContainer>
        <Stack spacing={3}>
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                minWidth: 0,
                p: "7px",
                borderRadius: "50%",
                color: "grey.600",
                borderColor: "grey.300",
                "&:hover": {
                  backgroundColor: "grey.100",
                  borderColor: "#e7000b",
                  color: "#e7000b",
                },
              }}
            >
              <IoMdClose className="w-5 h-5 text-red" />
            </Button>

            <Typography
              sx={{ color: "#364153", fontSize: "19px", fontWeight: 600 }}
            >
              WhatsApp Web
            </Typography>
          </Box>

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
              Abra o WhatsApp no seu telefone e escaneie o QR Code para
              conectar.
            </Typography>
          </Box>
        </Stack>
      </CardContainer>
    </Box>
  );
}
