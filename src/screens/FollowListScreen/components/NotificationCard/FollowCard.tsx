import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FollowCardProps } from "./FollowCard.types";
import Button from "@/components/Button/Button";

export default function FollowCard({ user, goToUserProfileScreen, handleClickFollow, isExternalUser }: FollowCardProps) {
  const { locale } = useContext(LocaleContext);
  const { followListScreen: followListScreenLocale } = locale;
  const { theme } = useTheme();

  const mountUserAvatar = ({avatar = null}: { avatar: string | null }) => {
    if (avatar) {
      return avatar;
    }
    
    return <Ionicons name="person" size={24} color={theme.primary100} />;
  };

  return (
    <TouchableOpacity key={user.id} onPress={goToUserProfileScreen} style={[ styles.wrapper, { borderColor: theme.primary10 } ]}>
      <View style={[styles.avatar, { backgroundColor: theme.primary10 }]}>
        {mountUserAvatar({ avatar: user?.avatar })}
      </View>

      <Text style={[styles.notificationText, { color: theme.primary100 }]}>
        <Text style={{ color: theme.primary100, fontFamily: 'primaryBold' }}>{user?.username}</Text>
      </Text>

      {isExternalUser && (
        <Button
          text={user.following ? followListScreenLocale.unfollow : followListScreenLocale.follow}
          color={user.following ? 'grey20' : 'primary50'}
          onClick={handleClickFollow}
          variant="secondary"
          size="small"
          fontSize={12}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: '50%',
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'primaryRegular',
    width: '100%',
  },
});