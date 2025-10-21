export interface StickerType {
  id: number;
  number: number;
  quantity: number;
}

export const createStickersArray = (): StickerType[] => {
  const stickers: StickerType[] = [];
  
  for (let i = 0; i < 600; i++) {
    stickers.push({
      id: i + 1,
      number: i,
      quantity: 0
    });
  }
  
  return stickers;
};
