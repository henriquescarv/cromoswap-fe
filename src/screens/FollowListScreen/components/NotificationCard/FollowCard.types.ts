export type UserProps = {
  id: number;
  avatar: string | null;
  username: string;
  following: boolean;
}

export type FollowCardProps = {
  user: UserProps;
  isExternalUser: boolean;
  goToUserProfileScreen: () => void;
  handleClickFollow?: () => void;
}
