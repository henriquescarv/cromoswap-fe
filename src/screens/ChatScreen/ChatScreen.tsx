import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image, ActivityIndicator, KeyboardEvent } from 'react-native';
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const insets = useSafeAreaInsets();

  const {
    messages: messagesStore,
    summary: summaryStore,
    setMessagesWithUser,
    requestMessagesWithUser,
    requestMessagesMarkAllSeen,
    resetUnreadMessagesCount,
  } = useStore((state: any) => state);

  const chatData = messagesStore?.withUser?.data || null;

  const flatListRef = useRef<FlatList>(null);

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
    resetUnreadMessagesCount();
  }, [userId, requestMessagesMarkAllSeen, resetUnreadMessagesCount]);

  useEffect(() => () => {
    cleanUpFunction();
  }, [cleanUpFunction]);

  useEffect(() => {
    if (!myId) return;
    const socket = connectSocket(myId);

    socket.on('connect', () => { });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(`Erro ao enviar mensagem: ${error.message}`);
    });

    socket.on('receive_message', (msg) => {
      if (msg && msg.senderId === userId) {
        const existingMessages = chatData?.messages || [];
        const messageExists = existingMessages.some((m: any) => m.id === msg.id);

        if (!messageExists) {
          setMessagesWithUser({
            data: {
              ...chatData,
              messages: [msg, ...existingMessages],
            },
            userId,
            status: 'success',
          });

          requestMessagesMarkAllSeen({ userId });
        }
      } else {
        getDefaultData();
      }
    });

    return () => {
      disconnectSocket();
    };
  }, [myId, getDefaultData, chatData, userId, setMessagesWithUser]);

  const loadMoreMessages = useCallback(async () => {
    if (loadingMore || !chatData?.pagination?.hasMore) return;

    setLoadingMore(true);
    try {
      const currentOffset = chatData.messages?.length || 0;
      await requestMessagesWithUser({ userId, offset: currentOffset, append: true });
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, chatData, userId, requestMessagesWithUser]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

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

    const socket = getSocket();
    if (!socket) {
      alert('Erro: Conexão não estabelecida. Tente novamente.');
      return;
    }

    if (!socket.connected) {
      // Aguarda conexão antes de enviar
      const connectTimeout = setTimeout(() => {
        alert('Erro: Tempo esgotado ao conectar. Tente novamente.');
      }, 5000);

      socket.once('connect', () => {
        clearTimeout(connectTimeout);
        sendMessageNow(socket, content);
      });
      return;
    }

    sendMessageNow(socket, content);
  };

  const sendMessageNow = (socket: any, content: string) => {
    setNewMessageContent('');

    socket.emit('send_message', {
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
          messages: [newMsg, ...(chatData.messages || [])],
        },
        userId,
        status: 'success',
      });
    }
  };

  if (messagesStore.withUser.loading || (!chatData && messagesStore.withUser.status === null)) {
    return (
      <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
        <View style={[styles.loadingWrapper]}>
          <ActivityIndicator
            size="large"
            color={theme.primary50}
            style={[styles.wrapper]}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        </TouchableWithoutFeedback>

        <FlatList
          ref={flatListRef}
          data={chatData?.messages || []}
          keyExtractor={(item) => item.id.toString()}
          inverted
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color={theme.primary50} style={{ padding: 16 }} />
            ) : null
          }
          renderItem={({ item: message }) => (
            <View style={[styles.messageContainer, { alignItems: messagePosition(message.senderId) }]}>
              <Message
                message={message.content}
                sender={getSenderById(message.senderId)}
              />
            </View>
          )}
          contentContainerStyle={styles.contentWrapper}
        />

        <View style={[styles.chatInputContainer, { paddingBottom: Platform.OS === 'ios' ? insets.bottom : 24 }]}>
          <ChatInput
            placeholder={chatLocale.placeholder}
            value={newMessageContent}
            onChangeText={setNewMessageContent}
            onSendMessage={() => sendMessage(newMessageContent)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
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
