import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Album } from '@/components/Album';
import { Ionicons } from '@expo/vector-icons';
import Search from '@/components/Search/Search';
import { AlbumType } from './ChooseAlbumScreen.types';
import useStore from '@/services/store';

export default function ChooseAlbumScreen({ navigation }: any) {
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState<AlbumType[]>([]);
  const insets = useSafeAreaInsets();

  const { albumsTemplates: albumsTemplatesStore, requestAlbumsTemplates } = useStore((state: any) => state);

  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { chooseAlbum: chooseAlbumLocale } = locale;

  const getDefaultData = useCallback(() => {
    if (albumsTemplatesStore.status === null) {
      requestAlbumsTemplates();
    }
  }, [albumsTemplatesStore.status]);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const templateAlbums = albumsTemplatesStore.list || [];

  // const templateAlbums2 = [
  //   {
  //     id: 1,
  //     name: 'Copa do Mundo 2022',
  //     image: 'https://cdn.conmebol.com/wp-content/uploads/2019/09/fwc_2022_square_portrait1080x1080-1024x1024.png',
  //     totalStickers: 600,
  //     percentCompleted: 50,
  //     tags: ['Futebol', 'Copa do Mundo 2022', 'Copa', '2022', 'FIFA', 'Copa 2022'],
  //   },
  // ];

  const updateFilteredList = useCallback(() => {
    if (filter === '') {
      setFilteredList(templateAlbums);
      return;
    }

    const filteredByName = templateAlbums.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

    const filteredByTags = templateAlbums.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
    );

    const filteredByAll = [...filteredByName, ...filteredByTags].filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
    );

    setFilteredList(filteredByAll);
  }, [filter, albumsTemplatesStore.list]);

  useEffect(() => {
    updateFilteredList();
  }, [updateFilteredList])

  const goBack = () => {
    navigation.goBack();
  };

  const goToPurchaseAlbum = (album: any) => {
    navigation.navigate('PurchaseAlbumScreen', { album });
  };

  if (albumsTemplatesStore.loading) {
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
        <View style={styles.wrapper}>
          <View style={[styles.headBlock]}>
            <View style={[styles.headContainer]}>
              <TouchableOpacity onPress={goBack}>
                <Ionicons
                  name={"chevron-back-outline"}
                  size={32}
                  color={theme.primary50}
                />
              </TouchableOpacity>

              <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{chooseAlbumLocale.albumsTitle}</Text>
            </View>

            <Search
              placeholder={chooseAlbumLocale.searchPlaceholder}
              onChangeText={setFilter}
              value={filter}
            />
          </View>

          <ScrollView style={[styles.contentWrapper]}>
            <View style={[styles.blockContainer]}>
              <View style={[styles.albumsContainer]}>
                {filteredList.map((item) => (
                  <Album
                    key={item.id}
                    name={item.name}
                    image={item.image}
                    totalStickers={item.totalStickers}
                    onClick={() => goToPurchaseAlbum(item)}
                  />
                ))}
              </View>
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
    display: 'flex',
    width: '100%',
    flex: 1,
  },
  blockContainer: {
    display: 'flex',
    width: '100%',
    padding: 20,
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
  albumsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    marginBottom: 120,
  },
  title: {
    fontSize: 24,
    fontFamily: 'primaryBold',
    width: '100%',
  },
});