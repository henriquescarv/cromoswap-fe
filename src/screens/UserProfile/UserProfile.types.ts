export enum TabEnum {
  YOU_NEED = 'YOU_NEED',
  YOU_HAVE = 'YOU_HAVE',
}

type StickersRelation = {
  quantity: number;
  albumsList: {
      albumId: number;
      name: string;
      quantity: number;
      stickersList: {
          id: number;
          order: number;
          number: string;
          category: string;
      }[];
  }[];
}

export type UserProfileProps = {
  id: number;
  avatar: null;
  username: string;
  followers?: number;
  following?: number;
  albums: {
      id: number;
      userAlbumId: number;
      name: string;
      image: string;
      percentCompleted: number;
  }[];
  youNeed?: StickersRelation | null;
  youHave?: StickersRelation | null;
}