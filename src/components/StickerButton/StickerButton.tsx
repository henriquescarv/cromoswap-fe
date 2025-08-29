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
}

const StickerButton = React.memo(({ 
  item, 
  onPlusPress, 
  onMinusPress,
  theme,
  itemWidth,
  buttonHeight 
}: StickerButtonProps) => {
  const displayMinusButton = item.quantity > 0;

  // Regras de cor similares ao StickerItem
  const colorRules = {
    0: 'transparent',
    1: theme.primary10,
    2: theme.grey5,
  };

  const backgroundColor = colorRules[item.quantity] || theme.grey5;
  const displayQuantity = item.quantity > 0;

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
          onPress={() => onPlusPress(item.id)}
        >
          {displayQuantity && (
            <Text style={[styles.quantityText, { color: theme.grey15 }]}>
              {item.quantity}
            </Text>
          )}

          <View style={[
            styles.numberWrapper,
            { 
              bottom: displayMinusButton ? 0 : 0, // Ajuste dinâmico baseado na presença do botão
            }
          ]}>
            <Text style={[styles.numberText, { color: theme.primary100 }]}>
              {item.number}
            </Text>
          </View>
        </TouchableOpacity>
        
        {displayMinusButton && (
          <TouchableOpacity
            style={[styles.minusWrapper, { borderColor: theme.grey10 }]}
            onPress={() => onMinusPress(item.id)}
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
    display: 'flex',
    justifyContent: 'space-between',
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
    fontFamily: 'primaryBold',
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  numberWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  numberText: {
    fontSize: 18,
    fontFamily: 'primaryMedium',
    lineHeight: 20,
  },
  minusWrapper: {
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
