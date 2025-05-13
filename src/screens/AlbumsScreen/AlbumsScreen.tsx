import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Album } from '@/components/Album';
import { Ionicons } from '@expo/vector-icons';
import Search from '@/components/Search/Search';
import { AlbumType } from './AlbumsScreen.types';
import useStore from '@/services/store';
import { useRoute } from '@react-navigation/native';

export default function AlbumsScreen({ navigation }: any) {
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState<AlbumType[]>([]);

  const {
    summary: summaryStore,
    userAlbums: userAlbumsStore,
    externalUserAlbums: externalUserAlbumsStore,
    requestUserAlbums,
    requestExternalUserAlbums,
  } = useStore((state: any) => state);

  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { myAlbums: myAlbumsLocale } = locale;

  const route = useRoute<any>();

  const myUserId = summaryStore.data?.id;
  const userId = route?.params?.userId || myUserId;

  const isExternalUser = userId !== myUserId;

  const albumsList = isExternalUser ? externalUserAlbumsStore.list : userAlbumsStore.list || [];

  // const templateAlbums = [
  //   {
  //     id: 1,
  //     name: 'Copa do Mundo 2022',
  //     image: 'https://cdn.conmebol.com/wp-content/uploads/2019/09/fwc_2022_square_portrait1080x1080-1024x1024.png',
  //     totalStickers: 600,
  //     percentCompleted: 50,
  //     tags: ['Futebol', 'Copa do Mundo 2022', 'Copa', '2022', 'FIFA', 'Copa 2022'],
  //   },
  // ];

  const getDefaultData = useCallback(() => {
    if (isExternalUser) {
      requestExternalUserAlbums({ userId })
      return;
    }

    requestUserAlbums();
  }, [userId, myUserId]);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const updateFilteredList = useCallback(() => {
    if (filter === '') {
      setFilteredList(albumsList);
      return;
    }

    const filteredByName = albumsList.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  
    const filteredByTags = albumsList.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
    );
  
    const filteredByAll = [...filteredByName, ...filteredByTags].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
    );
  
    setFilteredList(filteredByAll);
  }, [filter, albumsList]);

  useEffect(() => {
    updateFilteredList();
  }, [updateFilteredList])

  const goBack = () => {
    navigation.goBack();
  };

  const goToAlbumScreen = (albumId: number) => {
    navigation.navigate('AlbumScreen', { albumId, userId });
  };

  const goToChooseAlbumScreen = () => {
    navigation.navigate('ChooseAlbumScreen');
  };

  if (userAlbumsStore.loading) {
    return (
      <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
        <View style={[styles.loadingWrapper]}>
          <ActivityIndicator
            size="large"
            color={theme.primary50}
            style={[ styles.wrapper ]}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
      <View style={[styles.headBlock]}>
        <View style={[styles.headContainer]}>
          <TouchableOpacity onPress={goBack}>
            <Ionicons
              name={"chevron-back-outline"}
              size={32}
              color={theme.primary50}
            />
          </TouchableOpacity>

          <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{isExternalUser ? myAlbumsLocale.externalUserAlbumsTitle : myAlbumsLocale.albumsTitle}</Text>
        </View>

        <Search
          placeholder={myAlbumsLocale.searchPlaceholder}
          onChangeText={setFilter}
          value={filter}
          disabled={!filteredList?.length}
        />
      </View>

      {!filteredList?.length && (
        <View style={[styles.emptyWrapper]}>
          <Text style={[styles.emptyStateText, { color: theme.primary100 }]}>{isExternalUser ? myAlbumsLocale.noAlbumsExternalUser : myAlbumsLocale.noAlbums}</Text>

          <TouchableOpacity style={[styles.plusButton, { borderColor: theme.primary100 }]} onPress={goToChooseAlbumScreen}>
            <Ionicons
              name={"add"}
              size={32}
              color={theme.primary100}
            />
          </TouchableOpacity>
        </View>
      )}

      {!!filteredList?.length && (
        <ScrollView style={[styles.contentWrapper]}>
          <View style={[styles.blockContainer]}>
            <View style={[styles.albumsContainer]}>
              {filteredList.map(item => (
                <Album
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  percentCompleted={item.percentCompleted}
                  onClick={() => goToAlbumScreen(item.userAlbumId)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  loadingWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headBlock: {
    padding: 16,
    gap: 24,
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  contentWrapper: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  blockContainer: {
    display: 'flex',
    width: '100%',
    padding: 20,
  },
  blockTitle: {
    fontSize: 20,
    fontFamily: 'primaryBold',
  },
  albumsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  emptyWrapper: {
    flex: 1,
    display: 'flex',
    gap: 32,
    width: '100%',
    height: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
});