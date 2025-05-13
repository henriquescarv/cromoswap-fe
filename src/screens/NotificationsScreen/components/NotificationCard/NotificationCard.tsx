import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NotificationCardProps } from "./NotificationCard.types";

export default function NotificationCard({ notification, goToUserProfileScreen }: NotificationCardProps) {
  const { locale } = useContext(LocaleContext);
  const { notifications: notificationsLocale } = locale;
  const { theme } = useTheme();

  const mountUserAvatar = ({avatar = null}: { avatar: string | null }) => {
    if (avatar) {
      return avatar;
    }
    
    return <Ionicons name="person" size={32} color={theme.primary100} />;
  };

  const mountTimeAgoLabel = (notificationDate: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - notificationDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return notificationsLocale.time.now;
    } else if (diffInSeconds < 3600) {
      return notificationsLocale.time.minute(Math.floor(diffInSeconds / 60));
    } else if (diffInSeconds < 86400) {
      return notificationsLocale.time.hour(Math.floor(diffInSeconds / 3600));
    } else {
      return notificationsLocale.time.day(Math.floor(diffInSeconds / 86400));
    }
  };

  return (
    <TouchableOpacity key={notification.id} onPress={goToUserProfileScreen} style={[ styles.wrapper, { borderColor: theme.primary10 } ]}>
      <View style={[styles.avatar, { backgroundColor: theme.primary10 }]}>
        {mountUserAvatar({ avatar: notification.senderUser.avatar })}
      </View>

      <Text style={[styles.notificationText, { color: theme.primary100 }]}>
        <Text style={{ color: theme.primary100, fontFamily: 'primaryBold' }}>{notification.senderUser.username}</Text>
        {` ${notificationsLocale.newFollower} `}
        <Text style={{ color: theme.grey15 }}>{mountTimeAgoLabel(new Date(notification.createdAt))}</Text>
      </Text>

      {!notification.seen && (
        <View style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: theme.primary50 }} />
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
    width: 64,
    height: 64,
    borderRadius: '50%',
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'primaryRegular',
    width: '100%',
  },
});