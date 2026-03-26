import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import Button from '@/components/Button/Button';
import { AlbumType } from '../../AlbumsScreen.types';

const SHEET_HEIGHT = Dimensions.get('window').height * 0.55;

type DeleteAlbumSheetProps = {
  album: AlbumType | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteAlbumSheet({ album, loading, onClose, onConfirm }: DeleteAlbumSheetProps) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { myAlbums: myAlbumsLocale } = locale;

  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  useEffect(() => {
    if (album) {
      setIsVisible(true);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
        speed: 20,
      }).start();
    }
  }, [album]);

  useEffect(() => {
    if (!album && isVisible) {
      Animated.timing(slideAnim, {
        toValue: SHEET_HEIGHT,
        duration: 220,
        useNativeDriver: true,
      }).start(() => {
        setIsVisible(false);
        slideAnim.setValue(SHEET_HEIGHT);
      });
    }
  }, [album]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SHEET_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      slideAnim.setValue(SHEET_HEIGHT);
      onClose();
    });
  };

  const completeLabel = myAlbumsLocale.deleteSheet.title.toLowerCase().includes('excluir')
    ? 'completo'
    : 'complete';

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          { backgroundColor: theme.highLight, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.sheetHandle}>
          <View style={[styles.handle, { backgroundColor: theme.grey15 }]} />
        </View>

        {album && (
          <>
            <View style={styles.albumRow}>
              <Image
                source={typeof album.image === 'string' ? { uri: album.image } : album.image}
                style={styles.albumImage}
                resizeMode="cover"
              />
              <View style={styles.albumInfo}>
                <Text style={[styles.albumName, { color: theme.primary100 }]} numberOfLines={2}>
                  {album.name}
                </Text>
                {album.percentCompleted !== undefined && (
                  <Text style={[styles.albumPercent, { color: theme.grey20 }]}>
                    {album.percentCompleted}% {completeLabel}
                  </Text>
                )}
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: theme.grey5 }]} />

            <View style={styles.textBlock}>
              <Text style={[styles.title, { color: theme.primary100 }]}>
                {myAlbumsLocale.deleteSheet.title}
              </Text>
              <Text style={[styles.warning, { color: theme.grey20 }]}>
                {myAlbumsLocale.deleteSheet.warning}
              </Text>
            </View>

            <View style={styles.buttons}>
              <Button
                text={myAlbumsLocale.deleteSheet.confirm}
                variant="primary"
                color="primaryRed"
                widthFull
                loading={loading}
                disabled={loading}
                onClick={onConfirm}
                fontSize={14}
              />
              <Button
                text={myAlbumsLocale.deleteSheet.cancel}
                variant="secondary"
                color="grey20"
                widthFull
                disabled={loading}
                onClick={handleClose}
                fontSize={14}
              />
            </View>
          </>
        )}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sheetHandle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  albumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  albumImage: {
    width: 64,
    height: 80,
    borderRadius: 8,
  },
  albumInfo: {
    flex: 1,
    gap: 4,
  },
  albumName: {
    fontSize: 14,
    fontFamily: 'semiBold',
  },
  albumPercent: {
    fontSize: 13,
    fontFamily: 'primaryRegular',
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  textBlock: {
    gap: 6,
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'primaryBold',
  },
  warning: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
  },
  buttons: {
    gap: 10,
  },
});
