export type MessageProps = {
  otherUser: {
    username: string;
    avatar: string | null;
    id: number;
  };
  senderId: number;
  content: string,
  unreadMessages: number,
}

export type MessageCardProps = {
  message: MessageProps;
  goToChat: () => void;
}
