// Componentes
import { TypeMenssagem } from "@/components/ui/admin/typeMenssagem";

// Utils
import { formatRelativeTime } from "@/utils/mask/formatRelativeTime";

// Bibliotecas
import {
  Avatar,
  Badge,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

// Next
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Tipagem
import { itemsChatOverviews } from "@/types/chatOverviews";

interface ListContactsProps {
  contacts: itemsChatOverviews[];
}

export default function ChatsOverviews({ contacts }: ListContactsProps) {
  const chatId = useSearchParams().get("chatId");
  console.log("Dados: ", contacts);
  return (
    <List>
      {contacts !== undefined ? (
        contacts.map((chat) => (
          <Link key={chat.id} href={`/chat?chatId=${chat.phone}`}>
            <ListItemButton
              selected={chatId === chat.phone}
              sx={{
                borderRadius: "8px",
                "&.Mui-selected": {
                  bgcolor: "grey.100",
                },
                "&.Mui-selected:hover": {
                  bgcolor: "grey.200",
                },
                "&:hover": {
                  bgcolor: "grey.100",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={chat.photo}
                  alt={chat.name ? chat.name : chat.phone}
                  sx={{ width: 40, height: 40 }}
                />
              </ListItemAvatar>

              <ListItemText
                primary={chat.name ? chat.name : "Desconhecido"}
                secondary={
                  <TypeMenssagem
                    name={chat.name}
                    lastMenssagem={chat.lastMessage}
                  />
                }
                sx={{
                  wordBreak: "break-word",
                  "& .MuiListItemText-secondary": {
                    width: "330px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              />

              <Box textAlign="center">
                <Typography variant="caption" display="block">
                  {chat.lastMessage?.timestamp
                    ? formatRelativeTime(chat.lastMessage.timestamp)
                    : "-"}
                </Typography>

                {chat.unreadCount > 0 && (
                  <Badge
                    badgeContent={chat.unreadCount}
                    color="primary"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            </ListItemButton>
          </Link>
        ))
      ) : (
        <></>
      )}
    </List>
  );
}
