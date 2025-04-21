import React, { useContext } from 'react';
import { StyleSheet, Text, Keyboard, TouchableHighlight, View } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import Button from '@/components/Button/Button';
import { UserCardTypes } from './UserCars.types';
import { Ionicons } from '@expo/vector-icons';
import { Tag } from '@/components/Tag';

export default function UserCard({
  albums,
  username,
  trocableStickers,
  avatar,
  onClick,
}: UserCardTypes) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { home: homeLocale } = locale;

  const mountUserAvatar = () => {
    if (avatar) {
      return avatar;
    }
    
    return <Ionicons name="person" size={24} color={theme.primary100} />;
  }

  const userAvatar = mountUserAvatar();

  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <TouchableHighlight onPress={handleClick} style={[styles.touchableWrapper]}>
      <View style={[styles.wrapper, { backgroundColor: theme.grey6 }]}>
        <View style={[styles.topContent]}>
          <View style={[styles.leftContainer]}>
            <Tag number={trocableStickers} text={locale.home.nearYou.trocables} />
            <Text numberOfLines={1} style={[styles.username, { color: theme.primary100 }]}>{username}</Text>
          </View>

          <View style={[styles.avatar]}>
            {userAvatar}
          </View>
        </View>

        <View style={[styles.bottomContent, { backgroundColor: theme.grey5 }]}>
          {albums.slice(0, 2).map((album, index) => (
            <Text key={index} numberOfLines={1} style={[styles.albumName, { color: theme.primary100 }]}>• {album}</Text>
          ))}
          {albums.length > 2 && <Text style={[{ color: theme.primary100 }]}>...</Text>}

          <Button
            text={homeLocale.nearYou.seeProfile}
            variant="secondary"
            widthFull={false}
            fontSize={14}
            size='small'
            onClick={handleClick}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchableWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    width: 214,
  },
  wrapper: {
  },
  topContent: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
  },
  username: {
    fontSize: 14,
    fontFamily: 'primaryBold',
  },
  albumName: {
    fontSize: 12,
    fontFamily: 'primaryRegular',
  },
  bottomContent: {
    padding: 10,
    gap: 8,
  }
});
