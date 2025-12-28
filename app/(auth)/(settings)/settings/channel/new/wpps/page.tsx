// Componentes
import ChooseInstance from "@/components/ui/admin/chooseInstance";
import UnofficialInstance from "@/components/templates/admin/settings/unofficialInstance";

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
  const params = await searchParams;
  const token = (await cookieStore).get("auth_token")?.value;
  const session = (await cookieStore).get("session_id")?.value;
  const type = params?.type;
  const api = setupApiClient({ token: token });

  let qrCode;

  if (type === "unofficial") {
    const qr = await api.get(`/wpps/session/${session}/qrcode?isImg=false`);

    qrCode = qr.data;
  }

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
      overflow="auto"
    >
      <ChooseInstance />
      {type === "unofficial" && <UnofficialInstance qrCode={qrCode} />}
    </Box>
  );
}
