export type AlbumType = {
  id: number;
  userAlbumId: number;
  name: string;
  image: string;
  totalStickers: number;
  percentCompleted: number;
  tags: string[];
}