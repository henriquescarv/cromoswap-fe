import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Message } from './components/Message';
import { useRoute } from '@react-navigation/native';
import { ChatInput } from './components/ChatInput';

export default function ChatScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const route = useRoute();

  const { messages: messagesLocale } = locale;
  const userId = route.params.userId || null; // Get the userId from the route params

  const messagesList = [
    {
      id: 1,
      senderId: 1,
      text: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      senderId: 2,
      text: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 3,
      senderId: 1,
      text: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 4,
      senderId: 2,
      text: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 5,
      senderId: 1,
      text: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 6,
      senderId: 2,
      text: 'Qui voluptatem nemo 33 voluptatem culpa et numquam dolor. Et alias exercitationem id cupiditate suscipit qui perspiciatis voluptatem a obcaecati optio aut voluptate dolorem qui expedita quia. Qui reprehenderit quia est dolores suscipit et deleniti quibusdam qui adipisci ipsa et reiciendis corporis qui Quis dolores qui nulla expedita.',
    },
  ];

  const myId = 1; // This should be replaced with the actual user ID from your context or state management

  const getSenderById = (senderId: number) => {
    if (senderId === myId) {
      return 'me';
    } else {
      return 'other';
    }
  };

  const messagePosition = (senderId: number) => {
    if (senderId === myId) {
      return 'flex-end';
    } else {
      return 'flex-start';
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // ajuste conforme seu header
      >
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

        <ScrollView contentContainerStyle={styles.contentWrapper}>
          {messagesList.map((message) => (
            <View style={[styles.messageContainer, { alignItems: messagePosition(message.senderId) }]} key={message.id}>
              <Message
                key={message.id}
                message={message.text}
                sender={getSenderById(message.senderId)}
              />
            </View>
          ))}
        </ScrollView>

        <View style={[styles.chatInputContainer]}>
          <ChatInput />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
  },
  container: {
    height: '100%',
    flex: 1,
    width: '100%',
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
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  blockTitle: {
    fontSize: 20,
    fontFamily: 'primaryBold',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    marginBottom: 120,
    backgroundColor: 'red',
  },
  messageContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  chatInputContainer: {
    padding: 16,
    width: '100%',
  },
});
