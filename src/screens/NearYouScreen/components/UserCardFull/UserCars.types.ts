export type UserCardFullTypes = {
  username: string,
  youNeed: number,
  youHave: number,
  avatar?: string | null,
  albums: string[],
  onClick?: () => void,
  onSendMessage?: () => void,
}