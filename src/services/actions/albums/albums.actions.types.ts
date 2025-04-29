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



export type setAlbumDetailsLoadingProps = {
  set: any;
  loading: boolean;
}

export type requestAlbumDetailsProps = {
  set: any;
  userAlbumId: number | string;
}

export type setAlbumDetailsProps = {
  set: any;
  data?: any;
  status?: "success" | "error" | null;
}