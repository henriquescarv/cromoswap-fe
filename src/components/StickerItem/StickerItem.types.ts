export type StickerItemProps = {
  myAlbum?: boolean,
  showQuantity?: boolean,
  quantity?: number,
  topText?: string,
  number: string,
  plusAction: () => void,
  minusAction: () => void,
}