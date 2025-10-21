import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Message } from './components/Message';
import { useRoute } from '@react-navigation/native';
import { ChatInput } from './components/ChatInput';
import useStore from '@/services/store';
import { connectSocket, disconnectSocket, getSocket } from '@/services/socket/socket';

export default function ChatScreen({ navigation }: any) {
  const [newMessageContent, setNewMessageContent] = useState('');
  const insets = useSafeAreaInsets();

  const {
    messages: messagesStore,
    summary: summaryStore,
    setMessagesWithUser,
    resetLastMessages,
    requestMessagesWithUser,
    requestMessagesMarkAllSeen,
    resetUnreadMessagesCount,
  } = useStore((state: any) => state);

  const chatData = messagesStore?.withUser?.data || null;

  const scrollViewRef = useRef<ScrollView>(null);

  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const route = useRoute<any>();

  const { chat: chatLocale } = locale;

  const userId = route?.params?.userId || null;
  const myId = summaryStore.data?.id;

  const getDefaultData = useCallback(() => {
    requestMessagesWithUser({ userId });
  }, [userId]);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const cleanUpFunction = useCallback(() => {
    requestMessagesMarkAllSeen({ userId });
    resetLastMessages();
    resetUnreadMessagesCount();
  }, []);

  useEffect(() => () => {
    cleanUpFunction();
  }, [cleanUpFunction]);

  useEffect(() => {
    if (!myId) return;
    const socket = connectSocket(myId);

    socket.on('receive_message', (msg) => {
      // Atualizar store localmente ao receber mensagem
      if (msg && msg.senderId === userId) {
        setMessagesWithUser({
          data: {
            ...chatData,
            messages: [...(chatData?.messages || []), msg],
          },
          userId,
          status: 'success',
        });
      } else {
        getDefaultData();
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [myId, getDefaultData, chatData, userId, setMessagesWithUser]);

  const goToEndOfMessagesList = useCallback(() => {
    if (messagesStore?.withUser?.status === 'success') {

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }, 0);
    }
  }, [messagesStore?.withUser?.status]);

  useEffect(() => {
    goToEndOfMessagesList();
  }, [goToEndOfMessagesList]);

  const scrollToEndWhenOpeningKeyboard = useCallback(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 0);
    });
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    scrollToEndWhenOpeningKeyboard();
  }, [scrollToEndWhenOpeningKeyboard]);

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

  const mountUserAvatar = () => {
    if (chatData?.otherUser?.avatar) {
      return chatData.otherUser.avatar;
    }

    return <Ionicons name="person" size={16} color={theme.primary100} />;
  };

  const userAvatar = mountUserAvatar();

  const goBack = () => {
    navigation.goBack();
  };

  const goToUserProfile = () => {
    navigation.navigate('UserProfileScreen', { userId });
  };

  const sendMessage = (content: string) => {
    if (!myId || !userId) return;
    if (!content) return;
    setNewMessageContent('');
    Keyboard.dismiss();

    getSocket()?.emit('send_message', {
      senderId: myId,
      receiverId: userId,
      content,
    });

    if (chatData) {
      const newMsg = {
        id: Date.now(),
        senderId: myId,
        receiverId: userId,
        content,
        createdAt: new Date().toISOString(),
      };

      setMessagesWithUser({
        data: {
          ...chatData,
          messages: [...(chatData.messages || []), newMsg],
        },
        userId,
        status: 'success',
      });
    }
  };

  if (!chatData || messagesStore.withUser.loading) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
          <View style={[styles.loadingWrapper]}>
            <ActivityIndicator
              size="large"
              color={theme.primary50}
              style={[styles.wrapper]}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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

              <TouchableOpacity style={[styles.headContainer]} onPress={goToUserProfile}>
                <View style={[styles.avatar, { backgroundColor: theme.primary10 }]}>
                  {userAvatar}
                </View>

                <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{chatData?.otherUser?.username}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.contentWrapper}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {chatData?.messages?.map((message) => (
              <View style={[styles.messageContainer, { alignItems: messagePosition(message.senderId) }]} key={message.id}>
                <Message
                  key={message.id}
                  message={message.content}
                  sender={getSenderById(message.senderId)}
                />
              </View>
            ))}
          </ScrollView>

          <View style={[styles.chatInputContainer]}>
            <ChatInput
              placeholder={chatLocale.placeholder}
              value={newMessageContent}
              onChangeText={setNewMessageContent}
              onSendMessage={() => sendMessage(newMessageContent)}
              onFocus={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  wrapper: {
    width: '100%',
    height: '100%',
  },
  loadingWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
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
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 24,
  },
});
