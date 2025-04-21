export type UserCardTypes = {
  username: string,
  trocableStickers: number,
  avatar?: string | null,
  albums: string[],
  onClick: () => void,
}