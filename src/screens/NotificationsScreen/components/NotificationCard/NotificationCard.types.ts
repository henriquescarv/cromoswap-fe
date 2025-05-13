export type NotificationProps = {
  id: number;
  type: string;
  userId: number;
  senderUser: {
      id: number;
      username: string;
      avatar: null;
  };
  createdAt: string;
  seen: boolean;
}

export type NotificationCardProps = {
  notification: NotificationProps;
  goToUserProfileScreen: () => void;
}
