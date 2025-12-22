// React
import { useContext, useState } from "react";
import { AuthContext } from "@/provider/authProvider";

// Bibliotecas
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { LuLogOut } from "react-icons/lu";
import { CiDark, CiLight } from "react-icons/ci";

export default function DropDownAvatar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user, signOut } = useContext(AuthContext);
  const theme = useTheme();
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Perfil" placement="auto" arrow>
        <IconButton
          onClick={handleOpen}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
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

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mx: 5,
            borderRadius: "10px",
            minWidth: 220,
            boxShadow: "0px 4px 16px rgba(0,0,0,0.12)",
          },
        }}
      >
        <Box
          sx={{
            p: "1em 1.2em",
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: (theme) => theme.palette.grey[50],
          }}
        >
          <Avatar
            src={user?.photo}
            sx={{
              width: 44,
              height: 44,
              backgroundColor: "#1976D2",
              fontSize: "1rem",
            }}
          >
            {!user?.photo && user?.name?.[0]}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography sx={{ fontSize: "16px" }} fontWeight="600" noWrap>
              {user?.name}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: "13px" }} noWrap>
              {user?.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ m: 0.8 }} />

        <MenuItem
          sx={{
            px: 2,
            py: 1.5,
            borderRadius: 1,
            transition: "background 0.2s",
            "&:hover": {
              background: (theme) => theme.palette.action.hover,
            },
          }}
          disableRipple
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {theme.palette.mode === "light" ? (
              <CiLight className="w-5 h-5 text-gray-700" />
            ) : (
              <CiDark className="w-5 h-5 text-gray-700" />
            )}
          </ListItemIcon>

          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            Tema
          </Typography>

          <Switch
            checked={theme.palette.mode === "dark"}
            // onChange={() => colorMode.toggleColorMode()}
            color="primary"
            size="small"
          />
        </MenuItem>

        <MenuItem
          onClick={() => signOut()}
          sx={{
            px: 2,
            "&:hover": { background: "rgba(25, 118, 210, 0.08)" },
          }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <LuLogOut className="w-5 h-5" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
}
