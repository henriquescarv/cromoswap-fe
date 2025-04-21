import React, { useContext } from 'react';
import { AlbumProps } from './Album.types';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { Ionicons } from '@expo/vector-icons';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';

export default function Album({
  name = 'name',
  image,
  totalStickers,
  percentCompleted,
  onClick,
}: AlbumProps) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);

  const { home: homeLocale } = locale;

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <TouchableHighlight
      onPress={handleClick}
      style={[styles.container, { backgroundColor: theme.grey5, borderColor: theme.grey10 }]}
      underlayColor={theme.grey10}
    >
      <View style={styles.content}>
        <Image
          source={typeof image === 'string' ? { uri: image } : image}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.albumInfosContainer}>
          <View style={styles.albumDetails}>
            <Text
              style={[styles.name, { color: theme.primary100 }]}
              numberOfLines={1}
            >
              {name}
            </Text>

            {percentCompleted && (
              <View
                style={[styles.albumPercentageContainer, { borderColor: theme.primary50 }]}
              >
                <View style={[styles.albumPercentageBar, { backgroundColor: theme.primary50, width: `${percentCompleted}%` }]}>
                  <Text
                    style={[styles.percentageStickers, { color: theme.highLight }]}
                    numberOfLines={1}
                  >
                    {`${percentCompleted}%`}
                  </Text>
                </View>
              </View>
            )}

            {totalStickers && (
              <Text
                style={[styles.totalStickers, { color: theme.grey20 }]}
                numberOfLines={1}
              >
                {homeLocale.albums.totalStickers(totalStickers)}
              </Text>
            )}
          </View>

          <Ionicons name="chevron-forward" size={24} color={theme.grey20} />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    height: 90,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: 90,
    height: '100%',
  },
  albumInfosContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    flex: 1,
  },
  albumDetails: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'primaryBold',
  },
  albumPercentageContainer: {
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    maxWidth: '100%',
    marginTop: 4,
  },
  albumPercentageBar: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalStickers: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    marginTop: 4,
  },
  percentageStickers: {
    fontSize: 12,
    fontFamily: 'primaryBold',
    lineHeight: 18,
  },
});
