export type MessageProps = {
  user: {
    username: string;
    avatar: string | null;
  };
  lastMessage: string,
  unreadMessages: number,
  date: string;
}

export type MessageCardProps = {
  message: MessageProps;
  goToChat: () => void;
}
