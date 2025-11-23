export type ChatsItem = {
  id: string;
  contactName: string;
  profilePic: string;
  lastMessage: string;
  senderName: string;
  isSentByMe: boolean;
  chatType: string;
  groupName: string;
  unreadCount: number;
  isRead: boolean;
  isDelivered: boolean;
  lastMessageTime: Date;
};
