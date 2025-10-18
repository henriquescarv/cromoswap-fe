import { useMemo } from 'react';

export interface ScreenDimensions {
  width: number;
  height: number;
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

export const useLayoutCalculations = (screenData: ScreenDimensions): LayoutCalculations => {
  return useMemo(() => {
    const screenWidth = screenData.width;
    const minItemWidth = 70;
    const horizontalPadding = 16;
    const itemMargin = 8;
    const availableWidth = screenWidth - horizontalPadding;
    
    const numColumns = Math.floor(availableWidth / (minItemWidth + itemMargin));
    const actualNumColumns = Math.max(3, Math.min(numColumns, 6));
    
    const itemWidth = (availableWidth - (itemMargin * actualNumColumns)) / actualNumColumns;
    const buttonHeight = 90;
    const minusButtonHeight = 36;
    const itemHeight = buttonHeight + minusButtonHeight + 2;
    const rowHeight = itemHeight + itemMargin;

    return {
      screenWidth,
      numColumns: actualNumColumns,
      itemWidth,
      buttonHeight,
      minusButtonHeight,
      itemHeight,
      rowHeight,
    };
  }, [screenData.width, screenData.height]);
};
