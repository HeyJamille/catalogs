// Componentes
import ChooseInstance from "@/components/ui/admin/chooseInstance";

// Bibliotecas
import { Box } from "@mui/material";

// Next
import { cookies } from "next/headers";

// Utils
import { setupApiClient } from "@/utils/api";

export default async function Wpps({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  const session = (await cookieStore).get("session_id")?.value;
  console.log("paramentros: ", searchParams);
  const api = setupApiClient({ token: token });
  const qr = await api.get(`/wpps/session/${session}/qrcode`);

  return (
    <Box
      maxHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      width="100%"
      pt={2}
      gap={4}
      overflow={"auto"}
    >
      <ChooseInstance />
    </Box>
  );
}
