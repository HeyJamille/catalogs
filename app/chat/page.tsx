// ...existing code...
"use client";

import React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiMenu2Fill, RiMenu3Fill } from "react-icons/ri";
import slogan from "@/public/assets/slogan.png";
import { TbSettings } from "react-icons/tb";
import { CiBellOn } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";

export default function Inbox() {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const title = "Catalogs"; // ajuste conforme necessário ou passe via props
  const logo = null; // coloque um ReactNode aqui se houver logo

  function getMenuIcon(open: boolean) {
    return open ? (
      <IoCloseCircleOutline size={20} />
    ) : (
      <RiMenu3Fill className="w-5 h-5 text-gray-200" />
    );
  }

  const todayLabel = React.useMemo(() => {
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

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: <MdCalendarToday style={{ width: 20, height: 20 }} />,
    },
    {
      label: "Notificações",
      href: "/notifications",
      icon: <FaRegBell style={{ width: 20, height: 20 }} />,
    },
    {
      label: "Configurações",
      href: "/settings",
      icon: <TbSettings style={{ width: 20, height: 20 }} />,
    },
    {
      label: "Chat",
      href: "/chat",
      icon: <CiBellOn style={{ width: 20, height: 20 }} />,
    },
  ];

  return (
    <>
      <AppBar
        color="inherit"
        position="sticky"
        sx={{
          displayPrint: "none",
          //   boxShadow: "0 4px 14px rgba(2,6,23,0.12)",
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          borderBottom: `1px solid ${theme.palette.action.selected}`,
          px: { xs: 0, sm: 2 },
          width: "full",
          padding: 1,
        }}
      >
        {/* <Toolbar sx={{ py: 0.5, paddingX: 0 }}> */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Link
            href="/"
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
                  LOGICHUB
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(255,255,255,0.85)", display: "block" }}
                >
                  Dashboard
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
              <IconButton
                size="small"
                sx={{
                  p: 0.5,
                  borderRadius: 1.5,
                  bgcolor: "transparent",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                }}
                aria-label="configurações"
              >
                <TbSettings className="w-5 h-5" />
              </IconButton>
            </Tooltip>

            <Tooltip title={menuOpen ? "Fechar menu" : "Abrir menu"}>
              <IconButton
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
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
                {getMenuIcon(menuOpen)}
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        {/* </Toolbar> */}
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{
          sx: {
            width: menuOpen ? 240 : 70,
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
          },
        }}
      >
        <List disablePadding>
          {navItems.map((item) => (
            <Tooltip
              key={item.href}
              title={menuOpen ? "" : item.label}
              placement="right"
              arrow
            >
              <ListItemButton
                component="a"
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 600) setMenuOpen(false); // comportamento mobile
                }}
                sx={{
                  px: 2,
                  py: 1.25,
                  color: "inherit",
                  gap: 2,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.04)" },
                  justifyContent: menuOpen ? "flex-start" : "center",
                }}
              >
                <ListItemIcon sx={{ minWidth: "auto", color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                {menuOpen && (
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
            display: "flex-col",
            alignItems: "center",
            justifyContent: menuOpen ? "space-between" : "center",
            gap: 1,
          }}
        >
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
    </>
  );
}
