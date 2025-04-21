import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MessageCard } from './components/MessageCard';

export default function NotificationsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { messages: messagesLocale } = locale;

  const messagesList = [
    {
      user: { id: 1, username: 'alanpatrick', avatar: null },
      lastMessage: 'Lorem ipsum dolor sit amet',
      unreadMessages: 0,
      date: '2025-04-12 13:17:00',
    },
    {
      user: { id: 2, username: 'julianomachado', avatar: null },
      lastMessage: 'Est soluta exercitationem non adipisci inventore aut mollitia eaque. 33 quam delectus aut soluta minima est quos pariatur in voluptatum soluta. Ut doloremque ullam vel nesciunt quae rem enim accusamus ab quaerat quod',
      unreadMessages: 3,
      date: '2025-04-15 17:17:00',
    },
    {
      user: { id: 3, username: 'achadinhosdashopee2.0', avatar: null },
      lastMessage: 'Ut rerum omnis aut officia labore et voluptatibus.',
      unreadMessages: 0,
      date: '2025-04-15 13:17:00',
    },
  ];

  const goBack = () => {
    navigation.goBack();
  };

  const goToChat = (userId: number) => {
    navigation.navigate('ChatScreen', { userId });
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

          <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{messagesLocale.title}</Text>
        </View>
      </View>

      <ScrollView style={[styles.contentWrapper]}>
        <View style={[styles.listContainer]}>
          {messagesList.map((message) => <MessageCard key={message.date} message={message} goToChat={() => goToChat(message.user.id)} />)}
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