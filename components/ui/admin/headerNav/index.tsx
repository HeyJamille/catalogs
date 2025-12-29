// Bibliotecas
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { MdCalendarToday } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";
import { useMemo } from "react";

// Assets
import slogan from "@/public/assets/slogan.png";

// Next
import { usePathname } from "next/navigation";

// Tipagem
interface HeaderNavProps {
  isOpen: boolean;
  setMenu: (value: boolean) => void;
}

export default function HeaderNav({ isOpen, setMenu }: HeaderNavProps) {
  const theme = useTheme();
  const router = usePathname();

  const todayLabel = useMemo(() => {
    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const d = new Date();
    const month = monthNames[d.getMonth()];
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  }, []);

  return (
    <AppBar
      color="inherit"
      position="sticky"
      sx={{
        displayPrint: "none",
        boxShadow: "0 4px 14px rgba(2,6,23,0.12)",
        background: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.action.selected}`,
        px: { xs: 0, sm: 2 },
        width: "full",
        padding: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Link
          href="/chat"
          underline="none"
          color="inherit"
          sx={{ display: "inline-flex", alignItems: "center" }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar
              src={slogan.src}
              alt="Slogan"
              variant="rounded"
              className="-scale-x-100"
              sx={{
                width: 44,
                height: 44,
                bgcolor: "transparent",
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              }}
            />

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: 0.4,
                  color: "#fff",
                  background: "linear-gradient(90deg,#fff,#e6f0ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 1px 0 rgba(0,0,0,0.06)",
                }}
              >
                VEX
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.85)", display: "block" }}
              >
                Venda Expressa
              </Typography>
            </Box>
          </Stack>
        </Link>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Data">
            <IconButton
              size="medium"
              sx={{
                py: 0.5,
                borderRadius: 1.5,
                bgcolor: "rgba(255,255,255,0.06)",
                border: "1px solid",
                borderColor: "rgba(255,255,255,0.08)",
                "&:hover": {
                  transform: "translateY(-1px)",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MdCalendarToday
                  className="w-5 h-5"
                  style={{ color: "#fff", opacity: 0.95 }}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                    opacity: 0.95,
                    minWidth: 100,
                    textAlign: "center",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {todayLabel}
                </Typography>
              </Box>
            </IconButton>
          </Tooltip>

          <Tooltip title="Notificações">
            <IconButton
              sx={{
                p: 0.5,
                borderRadius: 1.5,
                bgcolor: "transparent",
                color: "#fff",
                "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
              }}
              aria-label="notificações"
            >
              <Badge
                color="error"
                variant="dot"
                overlap="circular"
                sx={{
                  ".MuiBadge-badge": {
                    transform: "scale(1) translate(8px,-6px)",
                  },
                }}
              >
                <FaRegBell className="w-5 h-5" />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Configurações">
            <Link
              href="/settings/profile"
              underline="none"
              color="inherit"
              sx={{ display: "inline-flex", alignItems: "center" }}
            >
              <IconButton
                size="small"
                sx={{
                  p: 0.5,
                  borderRadius: "8px",
                  bgcolor:
                    router === "/settings/profile" ||
                    router === "/settings/notify" ||
                    router === "/settings/channel"
                      ? "rgba(255,255,255,0.16)"
                      : "transparent",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                }}
                aria-label="configurações"
              >
                <TbSettings className="w-5 h-5" />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip title={false ? "Fechar menu" : "Abrir menu"}>
            <IconButton
              onClick={() => setMenu(!isOpen)}
              aria-label={false ? "Fechar menu" : "Abrir menu"}
              size="small"
              sx={{
                p: 0.5,
                borderRadius: 1.5,
                bgcolor: "rgba(255,255,255,0.06)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
                "&:hover": {
                  transform: "scale(1.04)",
                  bgcolor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              {isOpen ? (
                <IoCloseCircleOutline size={20} />
              ) : (
                <RiMenu3Fill className="w-5 h-5 text-gray-200" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {/* </Toolbar> */}
    </AppBar>
  );
}
