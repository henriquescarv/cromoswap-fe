import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Album } from '@/components/Album';
import { Ionicons } from '@expo/vector-icons';
import Search from '@/components/Search/Search';
import { AlbumType } from './MyAlbumsScreen.types';
import useStore from '@/services/store';

export default function MyAlbumsScreen({ navigation }: any) {
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState<AlbumType[]>([]);

  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { myAlbums: myAlbumsLocale } = locale;

  const {
    userAlbums: userAlbumsStore,
    requestUserAlbums,
  } = useStore((state: any) => state);

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
    requestUserAlbums();
  }, []);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const updateFilteredList = useCallback(() => {
    if (filter === '') {
      setFilteredList(userAlbumsStore.list);
      return;
    }

    const filteredByName = userAlbumsStore.list.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  
    const filteredByTags = userAlbumsStore.list.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
    );
  
    const filteredByAll = [...filteredByName, ...filteredByTags].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
    );
  
    setFilteredList(filteredByAll);
  }, [filter]);

  useEffect(() => {
    updateFilteredList();
  }, [updateFilteredList])

  const goBack = () => {
    navigation.navigate('HomeScreen');
  };

  const goToAlbumScreen = (albumId: number) => {
    navigation.navigate('AlbumScreen', { albumId });
  }

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

          <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{myAlbumsLocale.albumsTitle}</Text>
        </View>

        <Search
          placeholder={myAlbumsLocale.searchPlaceholder}
          onChangeText={setFilter}
          value={filter}
        />
      </View>

      <ScrollView style={[styles.contentWrapper]}>
        <View style={[styles.blockContainer]}>
          <View style={[styles.albumsContainer]}>
            {filteredList.map((item, index) => (
              <Album
                key={index} // trocar isso depois para item.id
                name={item.name}
                image={item.image}
                percentCompleted={item.percentCompleted}
                onClick={() => goToAlbumScreen(item.userAlbumId)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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
});