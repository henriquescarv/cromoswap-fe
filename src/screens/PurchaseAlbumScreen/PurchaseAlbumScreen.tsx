import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';

export default function PurchaseAlbumScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const { purchaseAlbum: purchaseAlbumLocale } = locale;

  const { album } = route.params as any;

  const { purchaseAlbum: purchaseAlbumStore, requestPurchaseAlbum } = useStore((state: any) => state);

  const handlePurchaseAlbum = useCallback(async () => {
    await requestPurchaseAlbum({ albumTemplateId: album.id }).then(() => {
      navigation.navigate('Main');
    });
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
        <View style={styles.wrapper}>
          <View style={[styles.header, { borderBottomColor: theme.grey5 }]}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Ionicons name="chevron-back-outline" size={32} color={theme.primary50} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.primary100 }]}>
              {album.name}
            </Text>
          </View>

          <Image
            source={typeof album.image === 'string' ? { uri: album.image } : album.image}
            style={[styles.image]}
            resizeMode="cover"
          />

          <View style={[styles.purchaseWrapper]}>
            <View style={[styles.textsWrapper]}>
              <Text style={[styles.stickersLabel, { color: theme.primary100 }]}>{purchaseAlbumLocale.stickersLabel(album.totalStickers || 0)}</Text>
            </View>

            <View style={[styles.buttonsWrapper]}>
              <Button
                text={purchaseAlbumLocale.collectAlbumButtonLabel}
                onClick={handlePurchaseAlbum}
                loading={purchaseAlbumStore.loading}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  backButton: {
    marginRight: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'primaryBold',
    textAlign: 'center',
    marginRight: 40,
  },
  image: {
    width: '90%',
    height: 300,
    borderRadius: 16,
    alignSelf: 'center',
    marginTop: 24,
  },
  purchaseWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 12,
    paddingTop: 32,
    gap: 40,
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