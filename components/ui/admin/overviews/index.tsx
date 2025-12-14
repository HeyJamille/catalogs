"use client";

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BsFillPersonPlusFill, BsFilter } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

export default function Overviews() {
  const [active, setActive] = useState("Individual");

  const options = ["Individual", "Grupos", "Canais", "Tags"];

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Sarah Anderson",
      lastMessage: "Hey! How are you doing?",
      time: "10:30",
      unread: 2,
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
      online: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      lastMessage: "The meeting is at 3 PM",
      time: "09:15",
      unread: 0,
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
      online: true,
    },
    {
      id: 3,
      name: "Emma Wilson",
      lastMessage: "Thanks for your help!",
      time: "Yesterday",
      unread: 0,
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
      online: false,
    },
    {
      id: 4,
      name: "James Rodriguez",
      lastMessage: "Can you send me the files?",
      time: "Yesterday",
      unread: 1,
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100",
      online: false,
    },
    {
      id: 5,
      name: "Olivia Martinez",
      lastMessage: "See you tomorrow!",
      time: "Monday",
      unread: 0,
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
      online: true,
    },
  ];

  return (
    <Box
      sx={{
        width: "500px",
        height: "100vh",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        borderRight: 1,
        borderRightColor: "divider",
        pb: 9,
      }}
    >
      <Box sx={{ px: 2, py: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Conversas</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              sx={{
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: "8px",
                color: "grey.700",
                "&:hover": {
                  backgroundColor: "grey.100",
                  borderColor: "grey.600",
                },
              }}
            >
              <BsFillPersonPlusFill className="w-5 h-5" />
            </IconButton>

            <IconButton
              sx={{
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: "8px",
                color: "grey.700",
                "&:hover": {
                  backgroundColor: "grey.100",
                  borderColor: "grey.600",
                },
              }}
            >
              <BsFilter className="w-5 h-5" />
            </IconButton>
          </Box>
        </Box>
        <TextField
          fullWidth
          placeholder="Pesquisar..."
          size="small"
          sx={{
            py: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FiSearch className="w-5 h-5" />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
          {options.map((label) => (
            <Button
              key={label}
              onClick={() => setActive(label)}
              variant={active === label ? "contained" : "outlined"}
              size="small"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                fontWeight: active === label ? "600" : "400",
              }}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Divider sx={{ marginX: 1 }} />

      <Box
        sx={{
          overflowY: "auto",
          px: 0.8,
        }}
      >
        <List sx={{}}>
          {contacts.map((contact) => (
            <ListItemButton key={contact.id} sx={{}}>
              <ListItemAvatar>
                <Badge
                  color="success"
                  variant="dot"
                  overlap="circular"
                  invisible={!contact.online}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  <Avatar
                    src={contact.avatar}
                    alt={contact.name}
                    sx={{ width: 40, height: 40 }}
                  />
                </Badge>
              </ListItemAvatar>

              <ListItemText
                primary={contact.name}
                secondary={contact.lastMessage}
                sx={{ wordBreak: "break-word" }}
              />

              <Box textAlign="center">
                <Typography variant="caption" display="block">
                  {contact.time}
                </Typography>

                {contact.unread > 0 && (
                  <Badge
                    badgeContent={contact.unread}
                    color="primary"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}
