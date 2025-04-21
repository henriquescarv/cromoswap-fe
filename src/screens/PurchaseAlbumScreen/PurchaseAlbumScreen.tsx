import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Button from '@/components/Button/Button';

export default function PurchaseAlbumScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const route = useRoute();

  const { album } = route.params;

  const { purchaseAlbum: purchaseAlbumLocale } = locale;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
        <Image
          source={typeof album.image === 'string' ? { uri: album.image } : album.image}
          style={[styles.image, { borderColor: theme.grey5 }]}
          resizeMode="cover"
        />

        <View style={[styles.purchaseWrapper]}>
          <View style={[styles.textsWrapper]}>
            <Text style={[styles.stickersLabel, { color: theme.primary100 }]}>{purchaseAlbumLocale.stickersLabel(album.totalStickers)}</Text>
            <Text style={[styles.albumName, { color: theme.primary100 }]} numberOfLines={2}>{album.name}</Text>
          </View>

          <View style={[styles.buttonsWrapper]}>
            <Button
              text={purchaseAlbumLocale.collectAlbumButtonLabel}
              onClick={() => {}}
            />
            <Button
              text={purchaseAlbumLocale.goBackButtonLabel}
              onClick={goBack}
              variant='secondary'
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 375,
    borderBottomWidth: 1,
  },
  purchaseWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    gap: 72,
    marginBottom: 40,
  },
  albumName: {
    fontSize: 24,
    fontFamily: 'primaryBold',
  },
  stickersLabel: {
    fontSize: 20,
    fontFamily: 'primaryRegular',
  },
  textsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonsWrapper: {
    gap: 16,
  },
});