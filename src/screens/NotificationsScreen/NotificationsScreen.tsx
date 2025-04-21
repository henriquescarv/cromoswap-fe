import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import NotificationCard from './components/NotificationCard/NotificationCard';

export default function NotificationsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { notifications: notificationsLocale } = locale;

  const notificationsList = [
    { id: 1, type: 'new_follower', user: { id: 1, username: 'alanpatrick', avatar: null }, date: '2025-04-12 13:17:00' },
    { id: 2, type: 'new_follower', user: { id: 2, username: 'julianomachado', avatar: null }, date: '2025-04-15 17:17:00' },
    { id: 3, type: 'new_follower', user: { id: 3, username: 'achadinhosdashopee2.0', avatar: null }, date: '2025-04-15 13:17:00' },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const goToUserProfileScreen = (userId: number) => {
    navigation.navigate('UserProfileScreen', { userId });
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
              goToUserProfileScreen={() => goToUserProfileScreen(notification.user.id)}
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