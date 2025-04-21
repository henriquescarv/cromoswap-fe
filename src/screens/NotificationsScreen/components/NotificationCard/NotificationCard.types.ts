export type NotificationProps = {
  id: number;
  type: string;
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
  date: string;
}

export type NotificationCardProps = {
  notification: NotificationProps;
  goToUserProfileScreen: () => void;
}
