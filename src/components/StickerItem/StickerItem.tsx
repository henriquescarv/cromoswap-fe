import React from "react";
import { StickerItemProps } from "./StickerItem.types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";

export default function StickerItem({
  myAlbum = false,
  number,
  quantity = 0,
  showQuantity = true,
  topText,
  plusAction,
  minusAction,
}: StickerItemProps) {
  const { theme } = useTheme();

  const displayMinusButton = quantity > 0;

  const colorRules = {
    0: 'transparent',
    1: theme.primary10,
    2: theme.grey5,
  };

  const backgroundColor = colorRules[quantity] || theme.grey5;

  const stickerHeight = myAlbum ? 80 : 60;

  const displayQuantity = showQuantity && quantity > 0;

  const handlePlusAction = () => {
    plusAction && plusAction();
  };

  const handleMinusAction = () => {
    minusAction && minusAction();
  };

  return (
    <View style={[styles.wrapper, { borderColor: theme.grey10, backgroundColor, height: stickerHeight }]}>
      <TouchableOpacity onPress={handlePlusAction} style={[ styles.plusArea ]}>
        <View>
          {displayQuantity && <Text style={[styles.topText, { color: theme.grey15 }]}>{quantity}</Text>}
          {topText && !displayQuantity && <Text style={[styles.topText, { color: theme.grey15 }]}>{topText}</Text>}
        </View>

        <View style={[styles.stickerOrderWrapper, { marginBottom: myAlbum ? 12 : 0 }]}>
          <Text style={[styles.stickerOrder, { color: theme.primary100 }]}>{number}</Text>
        </View>
      </TouchableOpacity>

      {(myAlbum) && (
        <TouchableOpacity
          onPress={displayMinusButton ? handleMinusAction : handlePlusAction}
          style={[styles.minusWrapper, { borderColor: displayMinusButton ? theme.grey10 : 'transparent' }]}
        >
          {displayMinusButton && <Text style={[styles.minus, { color: theme.primaryRed }]}>-</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '18%',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  plusArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'static',
    height: '100%',
  },
  topText: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'primaryMedium',
    fontSize: 12,
    lineHeight: 12,
    paddingVertical: 4,
  },
  stickerOrderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  stickerOrder: {
    fontFamily: 'semiBold',
    fontSize: 16,
    lineHeight: 20,
  },
  minusWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    height: 28,
  },
  minus: {
    fontFamily: 'primaryBold',
    fontSize: 20,
    lineHeight: 24,
  }
});