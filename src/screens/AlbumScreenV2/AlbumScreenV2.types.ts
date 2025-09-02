export interface RealStickerType {
  id: number;
  order: number;
  number: string;
  category: string | null;
  quantity: number;
}

export interface AlbumScreenV2Props {
  navigation: any;
}

export interface ScreenDimensions {
  width: number;
  height: number;
}

export interface StickerUpdate {
  id: number;
  quantity: number;
}

export interface LayoutCalculations {
  screenWidth: number;
  numColumns: number;
  itemWidth: number;
  buttonHeight: number;
  minusButtonHeight: number;
  itemHeight: number;
  rowHeight: number;
}
