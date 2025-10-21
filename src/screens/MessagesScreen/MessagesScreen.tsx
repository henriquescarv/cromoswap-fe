import React, { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MessageCard } from './components/MessageCard';
import useStore from '@/services/store';

export default function NotificationsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { messages: messagesLocale } = locale;
  const insets = useSafeAreaInsets();

  const {
    messages: messagesStore,
    requestLastMessages,
    resetLastMessages,
  } = useStore((state: any) => state);

  const getDefaultData = useCallback(() => {
    if (!messagesStore.lastMessages.status) {
      requestLastMessages();
    }
  }, [messagesStore.lastMessages.status]);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const cleanUpFunction = useCallback(() => {
    resetLastMessages();
  }, []);

  useEffect(() => () => {
    cleanUpFunction();
  }, [cleanUpFunction]);

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