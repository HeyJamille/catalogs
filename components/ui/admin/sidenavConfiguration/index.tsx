"use client";

// React
import React from "react";

// Next
import { usePathname } from "next/navigation";

// Bibliotecas
import { FaRegBell } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { LuUserCog } from "react-icons/lu";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { BiChevronRight } from "react-icons/bi";

export default function SideNavSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = usePathname();

  const menuItems = [
    {
      id: 1,
      label: "Perfil",
      href: "/settings/profile",
      icon: LuUserCog,
      section: "personal",
    },
    {
      id: 2,
      label: "Notificações",
      href: "/settings/notify",
      icon: FaRegBell,
      section: "personal",
    },
    {
      id: 3,
      label: "Canais",
      href: "/settings/channel",
      icon: FiPhone,
      section: "environment",
    },
  ];

  const sectionLabels: Record<string, string> = {
    personal: "Pessoal",
    environment: "Ambiente",
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          width: 280,
          position: "fixed",
          height: "100vh",
          bgcolor: "#fff",
          borderRight: "1px solid",
          borderColor: "divider",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Configurações
        </Typography>

        <List>
          {Object.entries(groupedItems).map(([section, items], idx) => (
            <React.Fragment key={section}>
              {idx > 0 && <Divider sx={{ my: 2 }} />}

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "text.secondary",
                  mb: 1,
                  px: 1,
                }}
              >
                {sectionLabels[section] ?? section}
              </Typography>

              {items.map((item) => {
                const Icon = item.icon;
                // Verifica se a rota atual começa com o href do item
                const isActive = router.startsWith(item.href);

                return (
                  <ListItemButton
                    key={item.id}
                    selected={isActive}
                    href={item.href}
                    sx={{
                      borderRadius: "10px",
                      my: 0.5,
                      px: 1,
                      "&.Mui-selected": {
                        color: "primary.main",
                        bgcolor: "action.selected",
                      },
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ListItemIcon
                        sx={{
                          minWidth: 32,
                          minHeight: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: isActive ? 1 : 0,
                          borderRadius: "8px",
                          borderColor: isActive
                            ? "primary.main"
                            : "transparent",
                        }}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-blue-500" : "text-gray-600"
                          }`}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={item.label}
                        sx={{
                          m: 0,
                          color: isActive ? "primary.main" : "#4a5565",
                          ".MuiTypography-root": { fontSize: 14 },
                        }}
                      />
                    </Box>

                    {isActive && (
                      <BiChevronRight className="w-4 h-4 text-blue-600" />
                    )}
                  </ListItemButton>
                );
              })}
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          ml: "280px",
          overflow: "auto",
          p: 3,
          flexGrow: 1,
          width: "calc(100% - 280px)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
