import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NotificationCard from './components/NotificationCard/NotificationCard';
import useStore from '@/services/store';

export default function NotificationsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { notifications: notificationsLocale } = locale;

  const {
    notifications: notificationsStore,
    notificationsUnreadCount: notificationsUnreadCountStore,
    requestNotifications,
    requestNotificationAsSeen,
    requestNotificationsUnreadCount,
    setNotificationsUnreadCount,
    setNotifications,
  } = useStore((state: any) => state);

  const notificationsList = notificationsStore.list || [];

  const getDefaultData = useCallback(() => {
    requestNotifications();
    requestNotificationsUnreadCount();
  }, []);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const goBack = () => {
    navigation.goBack();
  };

  const markNotificationAsSeen = (notificationId: number) => {
    requestNotificationAsSeen({ notificationId });

    const currentNotification = notificationsList.find((notification: any) => notification.id === notificationId);

    if (!currentNotification.seen) {
      const unreadCount = notificationsUnreadCountStore.quantity - 1;
      setNotificationsUnreadCount({ quantity: unreadCount, status: 'success' });
    }

    const updatedList = notificationsList.map((notification: any) =>
      notification.id === notificationId
        ? { ...notification, seen: true }
        : notification
    );

    setNotifications({ list: updatedList, status: 'success' });
  };

  const goToUserProfileScreen = (userId: number) => {
    navigation.navigate('UserProfileScreen', { userId });
  };

  const onClickNotification = ({ notificationId, userId }: { notificationId: number; userId: number }) => {
    markNotificationAsSeen(notificationId);
    goToUserProfileScreen(userId);
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
      <View style={[styles.headBlock, { borderColor: theme.primary10 }]}>
        <View style={[styles.headContainer]}>
          <TouchableOpacity onPress={goBack}>
            <Ionicons
              name={"chevron-back-outline"}
              size={32}
              color={theme.primary50}
            />
          </TouchableOpacity>

          <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{notificationsLocale.title}</Text>
        </View>
      </View>

      <ScrollView style={[styles.contentWrapper]}>
        <View style={[styles.listContainer]}>
          {notificationsList.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              goToUserProfileScreen={() => onClickNotification({ userId: notification.senderUser.id, notificationId: notification.id })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    width: '100%',
    height: 'auto',
  },
  headBlock: {
    padding: 16,
    gap: 24,
    borderBottomWidth: 1,
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  contentWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  blockTitle: {
    fontSize: 20,
    fontFamily: 'primaryBold',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 120,
  },
});