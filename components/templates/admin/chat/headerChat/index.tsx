// Next
import Link from "next/link";
import { useRouter } from "next/navigation";

// Componentes
import ButtonIcon from "@/components/ui/admin/btnIcons";

// Utils
import { formatPhone } from "@/utils/mask/phone";

// React
import { useEffect } from "react";

// Bibliotecas
import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { FaSquarePhone } from "react-icons/fa6";
import { GoTag } from "react-icons/go";
import { IoIosInformationCircleOutline, IoIosSearch } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

// Tipagem
import { itemsContacts } from "@/types/contacts";

export default function HeaderChat({ contacts }: { contacts?: itemsContacts }) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push("/chat");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <Toolbar sx={{ width: "100%", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            src={contacts?.profilePic.eurl}
            sx={{ width: 44, height: 44 }}
          />
          <Box>
            <Typography
              color="text.primary"
              sx={{ fontSize: "14px", fontWeight: 500 }}
            >
              {contacts?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                color: "oklch(72.3% 0.219 149.579)",
              }}
            >
              <FaSquarePhone className="w-5 h-5 text-green-500" />
              {formatPhone(`${"+" + contacts?.phone}`)}
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1}>
          <ButtonIcon
            title="Pesquisar"
            icon={<IoIosSearch className="w-5 h-5" />}
          />
          <ButtonIcon title="Tags" icon={<GoTag className="w-5 h-5" />} />
          <ButtonIcon
            title="Info"
            icon={<IoIosInformationCircleOutline className="w-5 h-5" />}
          />
          <Link href="/chat">
            <ButtonIcon
              title="Fechar"
              icon={<IoCloseOutline className="w-5 h-5" />}
            />
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
