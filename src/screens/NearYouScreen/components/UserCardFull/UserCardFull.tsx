import React, { useContext } from 'react';
import { StyleSheet, Text, Keyboard, TouchableHighlight, View } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import Button from '@/components/Button/Button';
import { Ionicons } from '@expo/vector-icons';
import { Tag } from '@/components/Tag';
import { UserCardFullTypes } from './UserCars.types';

export default function UserCard({
  albums,
  username,
  trocableStickers,
  avatar,
  onClick,
  onSendMessage,
}: UserCardFullTypes) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { nearYou: nearYouLocale } = locale;

  const mountUserAvatar = () => {
    if (avatar) {
      return avatar;
    }
    
    return <Ionicons name="person" size={24} color={theme.primary100} />;
  }

  const userAvatar = mountUserAvatar();

  return (
    <TouchableHighlight onPress={onClick} style={[styles.touchableWrapper]}>
      <View style={[styles.wrapper, { backgroundColor: theme.grey6 }]}>
        <View style={[styles.topContent]}>
          <View style={[styles.userInfos]}>
            <View style={[styles.avatar]}>
              {userAvatar}
            </View>
            <View style={[styles.usernameWrapper]}>
              <Text numberOfLines={2} style={[styles.username, { color: theme.primary100 }]}>{username}</Text>
            </View>
          </View>

          <View style={[styles.rightContainer]}>
            <View>
              <Tag number={trocableStickers} text={nearYouLocale.youHave} />
            </View>
            <View>
              <Tag number={trocableStickers} text={nearYouLocale.youNeed} variant='tertiary' />
            </View>
          </View>
        </View>

        <View style={[styles.bottomContent, { backgroundColor: theme.grey5 }]}>
          {albums.slice(0, 2).map((album, index) => (
            <Text key={index} numberOfLines={1} style={[styles.albumName, { color: theme.primary100 }]}>• {album}</Text>
          ))}
          {albums.length > 2 && <Text style={[{ color: theme.primary100 }]}>...</Text>}

          <View style={[styles.buttonsContainer]}>
            <View style={[styles.button1]}>
              <Button
                text={nearYouLocale.seeProfile}
                variant="secondary"
                fontSize={14}
                size='small'
                onClick={onClick}
              />
            </View>
            <View style={[styles.button2]}>
              <Button
                text={nearYouLocale.message}
                variant="secondary"
                fontSize={14}
                size='small'
                onClick={onSendMessage}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchableWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
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
  userInfos: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  usernameWrapper: {
    flex: 1,
    width: '100%',
    marginRight: 16,
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
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  button1: {
    flex: 1,
  },
  button2: {
    flex: 1,
  }
});
