"use client";

import { useState } from "react";

// Bibliotecas
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { MdOutlineReplyAll } from "react-icons/md";

// Tipagem
import type { itemsDetailChats } from "@/types/chatOverviews";

function MessageAvatar({
  url,
  position,
}: {
  url?: string;
  position: "left" | "right";
}) {
  if (!url) return null;
  return (
    <Avatar
      src={url}
      sx={{
        width: 36,
        height: 36,
        ...(position === "left" ? { mr: 1 } : { ml: 1 }),
      }}
    />
  );
}

function ReplyPreview({
  msg,
  fromMe,
}: {
  msg: itemsDetailChats["from_msg"];
  fromMe: boolean;
}) {
  if (!msg) return null;

  const isImage = msg.type === "image";
  return (
    <Box
      sx={{
        borderLeft: "3px solid",
        borderColor: fromMe ? "grey.300" : "grey.400",
        pl: 1,
        mb: 1,
      }}
    >
      {isImage ? (
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            component="img"
            src={`data:${msg.mimetype};base64,${msg.body}`}
            alt="Imagem enviada"
            sx={{ width: 180, objectFit: "contain" }}
          />
        </Box>
      ) : (
        <Typography
          sx={{ fontSize: "0.9rem", color: fromMe ? "grey.400" : "grey.600" }}
        >
          {msg.body}
        </Typography>
      )}
    </Box>
  );
}

function MediaContent({ msg }: { msg: itemsDetailChats }) {
  const isMedia = msg.type === "image" || msg.type === "sticker";
  if (!isMedia) return null;

  const width = msg.type === "sticker" ? 120 : 320;
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Box
        component="img"
        src={`data:${msg.mimetype};base64,${msg.mediaBase64}`}
        alt={msg.msg || "Imagem enviada"}
        sx={{ width, objectFit: "cover" }}
      />
      {msg.msg && (
        <Typography sx={{ fontSize: "0.9rem", wordBreak: "break-word" }}>
          {msg.msg}
        </Typography>
      )}
    </Box>
  );
}

export default function BodyChat({ msg }: { msg: itemsDetailChats }) {
  const [hover, setHover] = useState(false);

  const align = msg.fromMe ? "flex-end" : "flex-start";
  const bubbleBg = msg.fromMe ? "primary.main" : "#fff";
  const textColor = msg.fromMe ? "common.white" : "text.primary";

  return (
    <Box
      display="flex"
      justifyContent={align}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ width: "100%" }}
    >
      {hover && msg.fromMe && (
        <Box
          sx={{
            position: msg.fromMe ? "left" : "right",
            display: "flex",
            alignItems: "center",
            px: 1,
          }}
        >
          <Tooltip title="Responder" arrow>
            <IconButton
              sx={{
                bgcolor: "transparent",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <MdOutlineReplyAll className="w-5 h-5" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {!msg.fromMe && (
        <MessageAvatar url={msg.profilePicThumbUrl} position="left" />
      )}

      <Paper
        sx={{
          p: 1,
          borderRadius: 2,
          bgcolor: bubbleBg,
          color: textColor,
          maxWidth: "75%",
          width: "fit-content",
          position: "relative",
        }}
      >
        {msg.isReply && msg.from_msg && (
          <ReplyPreview msg={msg.from_msg} fromMe={msg.fromMe} />
        )}

        {msg.type === "image" || msg.type === "sticker" ? (
          <MediaContent msg={msg} />
        ) : (
          <Typography sx={{ fontSize: "0.9rem", wordBreak: "break-word" }}>
            {msg.msg}
          </Typography>
        )}
      </Paper>
      {hover && !msg.fromMe && (
        <Box
          sx={{
            position: msg.fromMe ? "left" : "right",
            display: "flex",
            alignItems: "center",
            px: 1,
          }}
        >
          <Tooltip title="Responder" arrow>
            <IconButton
              size="small"
              sx={{
                bgcolor: "transparent",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <MdOutlineReplyAll fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {msg.fromMe && (
        <MessageAvatar url={msg.profilePicThumbUrl} position="right" />
      )}
    </Box>
  );
}
