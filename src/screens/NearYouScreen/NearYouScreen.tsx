import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Search from '@/components/Search/Search';
import { UserCardFull } from './components/UserCardFull';
import { UserProps } from './NearYouScreen.types';

export default function MyAlbumsScreen({ navigation }: any) {
  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState<UserProps[]>([]);

  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { nearYou: nearYouLocale } = locale;

  const users = [
    {
      id: 1,
      username: 'alanpatrick',
      trocableStickers: 6,
      albums_in_common: [
        'Copa do Mundo 2022',
        'Harry Potter - e a Ordem da Fênix',
        'Harry Potter e a Câmara Secreta',
      ],
      avatar: null,
    },
    {
      id: 2,
      username: 'arcopararedencao',
      avatar: null,
      trocableStickers: 6,
      albums_in_common: [
        'Harry Potter - e a Ordem da Fênix',
        'Harry Potter e a Câmara Secreta',
      ],
    },
    {
      id: 3,
      username: 'carlosalberto',
      avatar: null,
      trocableStickers: 6,
      albums_in_common: [
        'Copa do Mundo 2022',
        'Harry Potter - e a Ordem da Fênix',
        'Harry Potter e a Câmara Secreta',
      ],
    },
  ];

    const updateFilteredList = useCallback(() => {
      if (filter === '') {
        setFilteredList(users);
        return;
      }
  
      const filteredByName = users.filter((item) =>
        item.username.toLowerCase().includes(filter.toLowerCase())
      );
    
      const filteredByTags = users.filter((item) =>
        item.albums_in_common.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
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
    navigation.goBack();
  };

  const goToUserProfile = (userId: number) => {
    navigation.navigate('UserProfileScreen', { userId });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

            <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{nearYouLocale.title}</Text>
          </View>

          <Search
            placeholder={nearYouLocale.searchPlaceholder}
            onChangeText={setFilter}
            value={filter}
          />
        </View>

        <ScrollView style={[styles.contentWrapper]}>
          <View style={[styles.blockContainer]}>
            <View style={[styles.albumsContainer]}>
              {filteredList.map((item) => (
                <UserCardFull
                  key={item.id}
                  username={item.username}
                  trocableStickers={item.trocableStickers}
                  albums={item.albums_in_common}
                  onClick={() => goToUserProfile(item.id)}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
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
    marginBottom: 120,
  },
});