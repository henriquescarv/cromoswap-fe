import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import Button from '@/components/Button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCard } from './components/UserCard';
import { Album } from '@/components/Album';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { home: homeLocale } = locale;

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
      username: 'marianajane',
      avatar: null,
      trocableStickers: 6,
      albums_in_common: [
        'Copa do Mundo 2022',
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

  const albums = [
    {
      id: 1,
      name: 'Copa do Mundo 2022',
      image: 'https://cdn.conmebol.com/wp-content/uploads/2019/09/fwc_2022_square_portrait1080x1080-1024x1024.png',
      totalStickers: 600,
      percentCompleted: 50,
    },
    {
      id: 2,
      name: 'Harry Potter - e a Ordem da Fênix',
      image: 'https://static.wikia.nocookie.net/harrypotter/images/e/e8/71clkMKyHhL._SL1425_.jpg/revision/latest?cb=20210210143929&path-prefix=pt-br',
      totalStickers: 600,
      percentCompleted: 75,
    },
    {
      id: 3,
      name: 'Copa do Mundo 2018',
      image: 'https://cdn.conmebol.com/wp-content/uploads/2019/09/fwc_2022_square_portrait1080x1080-1024x1024.png',
      totalStickers: 600,
      percentCompleted: 100,
    },
  ];

  const goToNearYouScreen = () => {
    navigation.navigate('NearYouScreen');
  };

  const goToMyAlbumsScreen = () => {
    navigation.navigate('MyAlbumsScreen');
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
        <View style={[styles.headContainer, { borderColor: theme.grey5 }]}>
          <Text style={[styles.title, { color: theme.primary100 }]}>{homeLocale.title}</Text>

          <View style={[styles.headIconsContainer]}>
            <TouchableOpacity onPress={goToNotificationsScreen}>
              <Ionicons
                name={"notifications"}
                size={28}
                color={theme.primary100}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={goToMessagesScreen}>
              <Ionicons
                name={"chatbubble-outline"}
                size={28}
                color={theme.primary100}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={[styles.contentWrapper]}>
          <View style={[styles.blockContainer]}>
            <View style={[styles.blockHead]}>
              <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{homeLocale.nearYou.nearYouTitle}</Text>
              <Button text={homeLocale.seeMoreButtonLabel} variant="text" fontSize={16} onClick={goToNearYouScreen} />
            </View>

            <FlatList
              data={users}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <UserCard
                  username={item.username}
                  trocableStickers={item.trocableStickers}
                  albums={item.albums_in_common}
                  onClick={() => goToUserProfileScreen(item.id)}
                />
              )}
              contentContainerStyle={styles.nearYouContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={[styles.blockContainer]}>
            <View style={[styles.blockHead]}>
              <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{homeLocale.albums.albumsTitle}</Text>
              <Button text={homeLocale.seeMoreButtonLabel} variant="text" fontSize={16} onClick={goToMyAlbumsScreen} />
            </View>

            <View style={[styles.albumsContainer]}>
              {albums.slice(0, 2).map((item) => (
                <Album
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  percentCompleted={item.percentCompleted}
                  onClick={() => goToAlbumScreen(item.id)}
                />
              ))}
              
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
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
    paddingBottom: 200,
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
});