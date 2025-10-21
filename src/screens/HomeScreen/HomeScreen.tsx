import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import Button from '@/components/Button/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserCard } from './components/UserCard';
import { Album } from '@/components/Album';
import { Ionicons } from '@expo/vector-icons';
import useStore from '@/services/store';
import { Skeleton } from '@/components/Skeleton';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { home: homeLocale } = locale;

  const {
    summary: summaryStore,
    usersByRegion: usersByRegionStore,
    userAlbums: userAlbumsStore,
    messages: messagesStore,
    notificationsUnreadCount: notificationsUnreadCountStore,
    requestUsersByRegion,
    requestUserAlbums,
    requestUnreadMessagesCount,
    resetUnreadMessagesCount,
    requestNotificationsUnreadCount,
    resetNotificationsUnreadCount,
  } = useStore((state: any) => state);

  const users = useMemo(() => {
    return usersByRegionStore.list.map(item => ({
      ...item,
      trocableStickers: Math.min(item.youHave ?? 0, item.youNeed ?? 0),
    })) || []
  }, [usersByRegionStore]);

  const albums = userAlbumsStore.list || [];

  const getDefaultData = useCallback(() => {
    requestUsersByRegion();

    if (!summaryStore.data?.id) return;

    requestNotificationsUnreadCount();
    requestUserAlbums();
  }, []);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const getUnreadMessagesCount = useCallback(() => {
    if (!summaryStore.data?.id || messagesStore?.unreadMessagesCount?.status) return;

    requestUnreadMessagesCount();
  }, [summaryStore.data?.id, messagesStore?.unreadMessagesCount?.status]);

  useEffect(() => {
    getUnreadMessagesCount();
  }, [getUnreadMessagesCount]);

  const getNotificationsUnreadCount = useCallback(() => {
    if (!summaryStore.data?.id || notificationsUnreadCountStore?.status) return;

    requestNotificationsUnreadCount();
  }, [summaryStore.data?.id, notificationsUnreadCountStore?.status]);

  useEffect(() => {
    getNotificationsUnreadCount();
  }, [getNotificationsUnreadCount]);

  const cleanUpFunction = useCallback(() => {
    resetUnreadMessagesCount();
    resetNotificationsUnreadCount();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        cleanUpFunction();
      };
    }, [cleanUpFunction])
  );

  const goToNearYouScreen = () => {
    navigation.navigate('NearYouScreen');
  };

  const goToAlbumsScreen = () => {
    navigation.navigate('AlbumsScreen');
  };

  const goToChooseAlbumScreen = () => {
    navigation.navigate('ChooseAlbumScreen');
  };

  const goToNotificationsScreen = () => {
    navigation.navigate('NotificationsScreen');
  };

  const goToMessagesScreen = () => {
    navigation.navigate('MessagesScreen');
  };

  const goToAlbumScreen = (albumId: number) => {
    navigation.navigate('AlbumScreen', { albumId });
  };

  const goToUserProfileScreen = (userId: number) => {
    navigation.navigate('UserProfileScreen', { userId });
  };

  const insets = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[
        styles.wrapper,
        {
          backgroundColor: theme.highLight,
          paddingTop: insets.top
        }
      ]}>
        <View style={[styles.headContainer, { borderColor: theme.grey5 }]}>
          <Text style={[styles.title, { color: theme.primary100 }]}>{homeLocale.title}</Text>

          <View style={[styles.headIconsContainer]}>
            <TouchableOpacity onPress={goToNotificationsScreen}>
              <Ionicons
                name={"notifications"}
                size={28}
                color={theme.primary100}
              />

              {notificationsUnreadCountStore?.quantity > 0 && (
                <View style={[styles.messagesCountContainer, { backgroundColor: theme.primary50 }]}>
                  <Text style={[styles.messagesCountText, { color: theme.highLight }]}>{notificationsUnreadCountStore?.quantity}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={goToMessagesScreen} style={{ position: 'relative' }}>
              <Ionicons
                name={"chatbubble-outline"}
                size={28}
                color={theme.primary100}
              />

              {messagesStore.unreadMessagesCount?.unreadCount > 0 && (
                <View style={[styles.messagesCountContainer, { backgroundColor: theme.primary50 }]}>
                  <Text style={[styles.messagesCountText, { color: theme.highLight }]}>{messagesStore.unreadMessagesCount?.unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={[styles.contentWrapper]}>
          {(<View style={[styles.blockContainer]}>
            <View style={[styles.blockHead]}>
              <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{homeLocale.nearYou.nearYouTitle}</Text>
              <Button text={homeLocale.seeMoreButtonLabel} variant="text" fontSize={16} onClick={goToNearYouScreen} />
            </View>

            {usersByRegionStore.loading && (
              <FlatList
                data={[...Array(3)]}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <Skeleton width={214} height={140} borderRadius={24} />
                )}
                contentContainerStyle={styles.nearYouContainer}
                showsHorizontalScrollIndicator={false}
              />
            )}

            {!usersByRegionStore.loading && !!usersByRegionStore.list.length && (
              <FlatList
                data={users}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <UserCard
                    username={item.username}
                    trocableStickers={item.trocableStickers}
                    albums={item.albumsInCommon}
                    onClick={() => goToUserProfileScreen(item.id)}
                  />
                )}
                contentContainerStyle={styles.nearYouContainer}
                showsHorizontalScrollIndicator={false}
              />
            )}

            {!usersByRegionStore.loading && !usersByRegionStore.list.length && (
              <View style={[styles.emptyStateContainer]}>
                <Text style={[styles.emptyStateText, { color: theme.primary100 }]}>{homeLocale.albums.noNearUsers}</Text>
              </View>
            )}
          </View>)}

          <View style={[styles.blockContainer]}>
            <View style={[styles.blockHead]}>
              <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{homeLocale.albums.albumsTitle}</Text>

              {albums?.length > 2 && (
                <Button
                  text={homeLocale.seeMoreButtonLabel}
                  variant="text"
                  fontSize={16}
                  onClick={goToAlbumsScreen}
                />
              )}
            </View>

            <View style={[styles.albumsContainer]}>
              {userAlbumsStore.loading && (
                <Skeleton
                  width="100%"
                  height={90}
                  borderRadius={16}
                />
              )}

              {!userAlbumsStore.loading && albums.slice(0, 2).map((item) => (
                <Album
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  percentCompleted={item.percentCompleted}
                  onClick={() => goToAlbumScreen(item.userAlbumId)}
                />
              ))}

              {!userAlbumsStore.loading && !albums?.length && (
                <View style={[styles.emptyStateContainer]}>
                  <Text style={[styles.emptyStateText, { color: theme.primary100 }]}>{homeLocale.albums.noAlbums}</Text>
                </View>
              )}

              <TouchableOpacity style={[styles.plusButton, { borderColor: theme.primary100 }]} onPress={goToChooseAlbumScreen}>
                <Ionicons
                  name={"add"}
                  size={32}
                  color={theme.primary100}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    height: '100%',
  },
  headContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: '100%',
  },
  contentWrapper: {
    display: 'flex',
    width: '100%',
    // paddingBottom: 200,
  },
  blockContainer: {
    display: 'flex',
    width: '100%',
    padding: 20,
    paddingTop: 32,
  },
  blockHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blockTitle: {
    fontSize: 20,
    fontFamily: 'primaryBold',
  },
  nearYouContainer: {
    marginTop: 16,
    gap: 16,
  },
  albumsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginTop: 16,
    gap: 16,
  },
  emptyStateContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 120,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'primaryMedium',
    textAlign: 'center',
  },
  plusButton: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 8,
  },
  headIconsContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'primaryBold',
  },
  messagesCountContainer: {
    position: 'absolute',
    right: -5,
    top: -5,
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messagesCountText: {
    fontSize: 12,
    fontFamily: 'primaryBold',
  },
});