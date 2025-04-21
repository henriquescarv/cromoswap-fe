export type UserCardFullTypes = {
  username: string,
  trocableStickers: number,
  avatar?: string | null,
  albums: string[],
  onClick?: () => void,
  onSendMessage?: () => void,
}