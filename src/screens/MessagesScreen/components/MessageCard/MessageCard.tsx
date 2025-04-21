import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MessageCardProps } from "./MessageCard.types";

export default function MessageCard({ message, goToChat }: MessageCardProps) {
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
    <TouchableOpacity style={[ styles.wrapper, { borderColor: theme.primary10 } ]} onPress={goToChat}>
      <View style={[styles.avatar, { backgroundColor: theme.primary10 }]}>
        {mountUserAvatar({ avatar: message.user.avatar })}
      </View>

      <View style={[styles.messageContainer]}>
        <Text style={[styles.notificationText, { color: theme.primary100 }]}>{message.user.username}</Text>
        <Text numberOfLines={2} style={[styles.lastMessageText, { color: theme.grey20 }]}>{message.lastMessage}</Text>
      </View>
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
  messageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '100%',
    paddingRight: 16,
  },
  notificationText: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    width: '100%',
  },
  lastMessageText: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    width: '100%',
  },
});