export type itemsLastMessage = {
  type: string;
  body: string;
  fromMe: boolean;
  timestamp: number;
};

export type itemsChatOverviews = {
  id: string;
  phone: string;
  name: string;
  photo: string;
  unreadCount: number;
  lastMessage: itemsLastMessage;
};

export type itemsDetailChats = {
  from: string;
  to: string;
  type: string;
  msg: string;
  isReply: boolean;
  profilePicThumbUrl: string;
  mimetype: string | null;
  mediaBase64: string | null;
  from_msg: {
    body: string;
    type: string;
    mimetype: string | null;
  };
  fromMe: boolean;
  timestamp: number;
};
