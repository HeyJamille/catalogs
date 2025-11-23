export type MessagesItem = {
  contactName: string;
  profilePic: string;
  contactNumber: string;
  chat: {
    id: string;
    body: string;
    type: string;
    from: string;
    to: string;
    isMe: boolean;
    contactName: string;
    profilePic: string;
    timestamp: Date;
    chatId: string;
  }[];
};
