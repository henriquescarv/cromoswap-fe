import React, { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MessageCard } from './components/MessageCard';
import useStore from '@/services/store';
import { connectSocket, disconnectSocket, getSocket } from '@/services/socket/socket';

export default function NotificationsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { messages: messagesLocale } = locale;
  const insets = useSafeAreaInsets();

  const {
    messages: messagesStore,
    summary: summaryStore,
    requestLastMessages,
  } = useStore((state: any) => state);

  const myId = summaryStore.data?.id;

  const getDefaultData = useCallback(() => {
    requestLastMessages();
  }, [requestLastMessages]);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  // Atualizar lista sempre que a tela ganhar foco (quando voltar do chat)
  useFocusEffect(
    useCallback(() => {
      requestLastMessages();
    }, [requestLastMessages])
  );

  // Socket listener para atualizar lista quando receber mensagem
  useEffect(() => {
    if (!myId) return;

    const socket = connectSocket(myId);

    socket.on('receive_message', () => {
      // Atualizar lista de conversas quando receber nova mensagem
      requestLastMessages();
    });

    return () => {
      disconnectSocket();
    };
  }, [myId, requestLastMessages]);

  const messagesList = messagesStore.lastMessages.list || [];

  const goBack = () => {
    navigation.goBack();
  };

  const goToChat = (userId: number) => {
    navigation.navigate('ChatScreen', { userId });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.safeArea, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
        <View style={styles.wrapper}>
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
              {messagesList.map((message) => <MessageCard key={message.id} message={message} goToChat={() => goToChat(message.otherUser.id)} />)}
            </View>
          </ScrollView>
        </View>
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
    flex: 1,
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