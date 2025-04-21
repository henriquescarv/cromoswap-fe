export type AlbumProps = {
  name: string;
  image?: string;
  totalStickers?: number;
  percentCompleted?: number;
  onClick?: () => void;
}