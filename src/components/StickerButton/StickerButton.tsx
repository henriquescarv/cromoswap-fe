import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface RealStickerType {
  id: number;
  order: number;
  number: string;
  category: string | null;
  quantity: number;
}

interface StickerButtonProps {
  item: RealStickerType;
  onPlusPress: (id: number) => void;
  onMinusPress: (id: number) => void;
  theme: any;
  itemWidth: number;
  buttonHeight: number;
  myAlbum?: boolean;
}

const StickerButton = React.memo(({ 
  item, 
  onPlusPress, 
  onMinusPress,
  theme,
  itemWidth,
  buttonHeight,
  myAlbum = true
}: StickerButtonProps) => {
  const displayMinusButton = item.quantity > 0 && myAlbum;

  const colorRules = {
    0: 'transparent',
    1: theme.primary10,
    2: theme.grey5,
  };

  const backgroundColor = colorRules[item.quantity] || theme.grey5;
  const displayQuantity = item.quantity > 0;

  const handlePlusAction = () => {
    if (myAlbum) {
      onPlusPress(item.id);
    }
  };

  const handleMinusAction = () => {
    if (myAlbum) {
      onMinusPress(item.id);
    }
  };

  return (
    <View style={[styles.stickerContainer, { width: itemWidth }]}>
      <View style={[
        styles.stickerWrapper, 
        { 
          borderColor: theme.grey10, 
          backgroundColor,
          height: buttonHeight 
        }
      ]}>
        <TouchableOpacity
          style={styles.plusArea}
          onPress={handlePlusAction}
          activeOpacity={1}
        >
          {displayQuantity && (
            <Text style={[styles.quantityText, { color: theme.grey15 }]}>
              {item.quantity}
            </Text>
          )}

          <Text style={[styles.numberText, { color: theme.primary100 }]}>
            {item.category ? `${item.category} ${item.number}` : item.number}
          </Text>
        </TouchableOpacity>
        
        {displayMinusButton && (
          <TouchableOpacity
            style={[styles.minusWrapper, { borderColor: theme.grey10 }]}
            onPress={handleMinusAction}
            activeOpacity={1}
          >
            <Text style={[styles.minusText, { color: theme.primaryRed }]}>
              -
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  stickerContainer: {
    margin: 4,
    alignItems: 'center',
  },
  stickerWrapper: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  plusArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
  },
  quantityText: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  numberText: {
    fontSize: 14,
    fontFamily: 'primaryBold',
    position: 'absolute',
    bottom: 40,
    textAlign: 'center',
    zIndex: 1,
  },
  minusWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    height: 36,
  },
  minusText: {
    fontFamily: 'primaryBold',
    fontSize: 20,
    lineHeight: 24,
  },
});

export default StickerButton;
