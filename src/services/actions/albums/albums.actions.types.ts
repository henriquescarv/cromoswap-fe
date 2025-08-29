export type setAlbumTemplatesLoadingProps = {
  set: any;
  loading: boolean;
}

export type requestAlbumTemplatesProps = {
  set: any;
}

export type setAlbumTemplatesProps = {
  set: any;
  list?: any;
  status?: "success" | "error" | null;
}



export type setPurchaseAlbumLoadingProps = {
  set: any;
  loading: boolean;
}

export type setPurchaseAlbumProps = {
  set: any;
  data?: any;
  status?: "success" | "error" | null;
  albumTemplateId?: number | string;
}

export type requestPurchaseAlbumProps = {
  set: any;
  albumTemplateId: number | string;
}



export type setUserAlbumsLoadingProps = {
  set: any;
  loading: boolean;
}

export type requestUserAlbumsProps = {
  set: any;
}

export type setUserAlbumsProps = {
  set: any;
  list?: any;
  status?: "success" | "error" | null;
}



export type setExternalUserAlbumsLoadingProps = {
  set: any;
  loading: boolean;
}

export type requestExternalUserAlbumsProps = {
  set: any;
  userId: number | string;
}

export type setExternalUserAlbumsProps = {
  set: any;
  list?: any;
  status?: "success" | "error" | null;
}



export type setAlbumDetailsLoadingProps = {
  set: any;
  loading: boolean;
}

export type requestAlbumDetailsProps = {
  set: any;
  userAlbumId: number | string;
  page?: number;
  maxStickers?: number;
}

export type setAlbumDetailsProps = {
  set: any;
  data?: any;
  status?: "success" | "error" | null;
}



export type setUsersByRegionLoadingProps = {
  set: any;
  loading: boolean;
}

export type requestUsersByRegionProps = {
  set: any;
}

export type setUsersByRegionProps = {
  set: any;
  list?: any;
  status?: "success" | "error" | null;
}



export type setExternalUserProfileLoadingProps = {
  set: any;
  loading: boolean;
}

export type requestExternalUserProfileProps = {
  set: any;
  userId: number | string;
}

export type setExternalUserProfileProps = {
  set: any;
  data?: any;
  status?: "success" | "error" | null;
}



export type setUpdateStickersQuantityLoadingProps = {
  set: any;
  loading: boolean;
}

export type StickerToUpdate = {
  id: number;
  quantity: number;
}

export type requestUpdateStickersQuantityProps = {
  set: any;
  stickersToUpdate: StickerToUpdate[];
}

export type setUpdateStickersQuantityProps = {
  set: any;
  status?: "success" | "error" | null;
}