// Bibliotecas
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { BsChatSquareDots } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { TbSettings } from "react-icons/tb";

// Tipagem
interface SideNavProps {
  isOpen: boolean;
  setMenu: (value: boolean) => void;
}

export default function SideNav({ isOpen, setMenu }: SideNavProps) {
  const theme = useTheme();

  const navItems = [
    {
      label: "Chats",
      href: "/",
      icon: <BsChatSquareDots style={{ width: 20, height: 20 }} />,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      // className="bg-blue-600"
      PaperProps={{
        sx: {
          width: isOpen ? 240 : 70,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          overflowX: "hidden",
          bgcolor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
          borderRight: `1px solid ${theme.palette.action.selected}`,
          top: { xs: "56px", sm: "61px" },
          height: { xs: "calc(100% - 60px)", sm: "calc(100% - 61px)" },
          pt: 1,
          px: 2,
        },
      }}
    >
      <List disablePadding>
        {navItems.map((item) => (
          <Tooltip
            key={item.href}
            title={false ? "" : item.label}
            placement="right"
            arrow
          >
            <ListItemButton
              component="a"
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 600) setMenu; // comportamento mobile
              }}
              sx={{
                px: 2,
                py: 1.25,
                color: "inherit",
                gap: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                justifyContent: isOpen ? "flex-start" : "center",
              }}
            >
              <ListItemIcon sx={{ minWidth: "auto", color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              {false && (
                <Typography
                  noWrap
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: theme.palette.getContrastText(
                      theme.palette.primary.main
                    ),
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </ListItemButton>
          </Tooltip>
        ))}
        <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.06)" }} />
      </List>
      {/* Adicionar engrenagem e avatar */}
      <Box
        sx={{
          position: "absolute",
          bottom: 12,
          left: 0,
          right: 0,
          px: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: 1,
        }}
      >
        <Tooltip title="Notificação" placement="right" arrow>
          <IconButton
            href="/settings"
            component="a"
            aria-label="configurações"
            sx={{
              color: "inherit",
              p: 0.5,
              borderRadius: 1.5,
              bgcolor: "transparent",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
            }}
          >
            <FaRegBell className="w-5 h-5" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Configurações" placement="right" arrow>
          <IconButton
            href="/settings"
            component="a"
            aria-label="configurações"
            sx={{
              color: "inherit",
              p: 0.5,
              borderRadius: 1.5,
              bgcolor: "transparent",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
            }}
          >
            <TbSettings className="w-5 h-5" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Perfil" placement="right" arrow>
          <IconButton
            href="/profile"
            component="a"
            aria-label="perfil"
            sx={{
              color: "inherit",
              p: 0.25,
              borderRadius: 1.5,
              bgcolor: "transparent",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: 14,
                bgcolor: "rgba(255,255,255,0.12)",
              }}
            >
              TU
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
