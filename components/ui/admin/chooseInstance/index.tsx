"use client";

// Bibliotecas
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";

// Componentes
import { CardContainer, CardHeader } from "../card";
import Alert from "../alert";

// React
import { useState } from "react";
import Link from "next/link";

export default function ChooseInstance() {
  const [createInstance, setCreateInstance] = useState<
    "official" | "unofficial" | undefined
  >();

  return (
    <>
      <CardContainer>
        <Stack spacing={3}>
          <CardHeader title="WhatsApp" type="back" href="/settings/channel" />

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
            <Tooltip title="WhatsApp Official está em desenvolvimento." arrow>
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
              <Link
                href={`/settings/channel/new/wpps?type=unofficial`}
                className="w-full"
                // onClick={() => setCreateInstance("unofficial")}
              >
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
                      sx={{
                        fontWeight: 600,
                        fontSize: "17px",
                        color: "#4a5565",
                      }}
                    >
                      WhatsApp Web
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </CardContainer>
    </>
  );
}
