export type StickerItemType = {
  id: number,
  order: number,
  number: string,
  category: string | null,
  quantity: number,
};

export type CategorySticketListType = StickerItemType[];

export type StickersListProps = CategorySticketListType[];

export enum ChipsTypes {
  HAVE = 'have',
  MISSING = 'missing',
  REPEATED = 'repeated',
  YOU_NEED = 'you_need',
  YOU_HAVE = 'you_have',
}

export type AlbumScreenRouteParams = {
  albumId: string;
  userId?: string;
}