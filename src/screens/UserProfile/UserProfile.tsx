import { Album } from "@/components/Album";
import Button from "@/components/Button/Button";
import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Tab } from "./components/Tab";
import { TabEnum } from "./UserProfile.types";
import { StickerItem } from "../../components/StickerItem";
import { ScrollView } from "react-native-gesture-handler";

export default function UserProfile({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState<keyof typeof TabEnum>(TabEnum.YOU_NEED);

  const route = useRoute();
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { userProfile: userProfileLocale } = locale;

  const myUserId = 12345; // This should be replaced with the actual user ID from your context or state management
  const userId = route?.params?.userId || myUserId;

  const isExternalUser = userId && userId !== myUserId;

  // const userProfile = {
  //   id: myUserId,
  //   avatar: null,
  //   username: "riquefml",
  //   albumsListLength: 4,
  //   followers: 20,
  //   following: 40,
  //   albumsList: [
  //     { id: 1, name: "Copa do Mundo 2022", image: "https://cdn.conmebol.com/wp-content/uploads/2019/09/fwc_2022_square_portrait1080x1080-1024x1024.png", percentCompleted: 50 },
  //     { id: 2, name: "Harry Potter - e a Ordem da Fênix", image: "https://static.wikia.nocookie.net/harrypotter/images/e/e8/71clkMKyHhL._SL1425_.jpg/revision/latest?cb=20210210143929&path-prefix=pt-br", percentCompleted: 75 },
  //   ],
  // };

  const userProfile = {
    id: 54321,
    avatar: null,
    username: "alanpatrick",
    albumsListLength: 4,
    followers: 20,
    following: 40,
    albumsList: [
      { id: 1, name: "Copa do Mundo 2022", image: "https://cdn.conmebol.com/wp-content/uploads/2019/09/fwc_2022_square_portrait1080x1080-1024x1024.png", percentCompleted: 50 },
    ],
    youNeed: {
      quantity: 15,
      albumsList: [
        {
          albumId: 1,
          name: 'Copa do Mundo 2022',
          quantity: 12,
          stickersList: [
            { id: 1, order: 1, number: '001', category: 'BRA' },
            { id: 2, order: 2, number: '002', category: 'BRA' },
            { id: 3, order: 3, number: '003', category: 'BRA' },
            { id: 4, order: 4, number: '004', category: 'BRA' },
            { id: 5, order: 5, number: '005', category: 'BRA' },
          ],
        },
        {
          albumId: 2,
          name: 'Harry Potter - e a Ordem da Fênix',
          quantity: 3,
          stickersList: [
            { id: 6, order: 1, number: '001' },
            { id: 7, order: 2, number: '002' },
            { id: 8, order: 3, number: '003' },
          ],
        },
      ]
    },
    youHave: {
      quantity: 10,
      albumsList: [
        {
          albumId: 3,
          name: 'Copa do Mundo 2022',
          quantity: 4,
          stickersList: [
            { id: 9, order: 1, number: '001', category: 'ARG' },
            { id: 12, order: 2, number: '002', category: 'ARG' },
            { id: 13, order: 3, number: '003', category: 'ARG' },
          ],
        },
        {
          albumId: 4,
          name: 'Harry Potter - e a Ordem da Fênix',
          quantity: 7,
          stickersList: [
            { id: 21, order: 1, number: '001' },
            { id: 22, order: 2, number: '002' },
            { id: 23, order: 3, number: '003' },
            { id: 24, order: 4, number: '004' },
            { id: 25, order: 5, number: '005' },
          ],
        },
      ]
    },
  };

  const listToShow = selectedTab === TabEnum.YOU_NEED ? userProfile.youNeed.albumsList : userProfile.youHave.albumsList;

  const mountUserAvatar = () => {
    if (userProfile.avatar) {
      return userProfile.avatar;
    }
    
    return <Ionicons name="person" size={32} color={theme.primary100} />;
  }

  const userAvatar = mountUserAvatar();

  const goBack = () => {
    navigation.goBack();
  };

  const goToAlbumScreen = (albumId: number) => {
    navigation.navigate('AlbumScreen', { albumId, userId });
  };

  const goToMyAlbumsScreen = () => {
    navigation.navigate('MyAlbumsScreen');
  };

  const goToChooseAlbumScreen = () => {
    navigation.navigate('ChooseAlbumScreen');
  };

  const mountPersonalInfo = ({ topText, bottomText }: { topText: string | number; bottomText: string }) => (
    <View style={[styles.personalInfo]}>
      <Text style={[styles.personalInfoTopText, { color: theme.primary100 }]}>{topText}</Text>
      <Text style={[styles.personalInfoBottomText, { color: theme.primary100 }]}>{bottomText}</Text>
    </View>
  );

  const mountButtons = () => {
    return isExternalUser ? (
      <>
        <View style={[styles.button]}>
          <Button
            text={userProfileLocale.follow}
            variant="secondary"
            onClick={() => {}}
            size="small"
            fontSize={14}
          />
        </View>
        <View style={[styles.button]}>
          <Button
            text={userProfileLocale.sendMessage}
            variant="secondary"
            onClick={() => {}}
            size="small"
            fontSize={14}
          />
        </View>
      </>
    ) : (
      <>
        <View style={[styles.button]} />
        <View style={[styles.button]}>
          <Button
            text={userProfileLocale.leave}
            variant="secondary"
            onClick={() => {}}
            size="small"
            color="primaryRed"
          />
        </View>
      </>
    );
  };

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

          <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{userProfile.username}</Text>
        </View>
      </View>

      <View style={[styles.profileInfosContainer]}>
        <View style={[styles.avatar, { backgroundColor: theme.primary10 }]}>
          {userAvatar}
        </View>
        {mountPersonalInfo({ topText: userProfile.albumsListLength, bottomText: userProfileLocale.albums })}
        {mountPersonalInfo({ topText: userProfile.followers, bottomText: userProfileLocale.followers })}
        {mountPersonalInfo({ topText: userProfile.following, bottomText: userProfileLocale.following })}
      </View>

      <View style={[styles.buttonsContainer, { borderBottomColor: !isExternalUser ? theme.grey5 : 'transparent' }]}>
        {mountButtons()}
      </View>

      <View style={[styles.contentWrapper]}>
        {!isExternalUser && (
          <View style={[styles.blockContainer]}>
            <View style={[styles.blockHead]}>
              <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{userProfileLocale.yourAlbums}</Text>
              <Button text={userProfileLocale.seeMore} variant="text" fontSize={16} onClick={goToMyAlbumsScreen} />
            </View>

              <View style={[styles.albumsContainer]}>
                {userProfile?.albumsList?.slice(0, 2).map((item) => (
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
        )}

        {isExternalUser && (
          <>
            <View style={[styles.externalUserWrapper]}>
              <View style={[styles.tabsContainer, { borderColor: theme.grey5 }]}>
                <Tab
                  label={userProfileLocale.externalUser.tabs[TabEnum.YOU_NEED](userProfile.youNeed.quantity)}
                  selected={selectedTab === TabEnum.YOU_NEED}
                  onPress={() => setSelectedTab(TabEnum.YOU_NEED)}
                />
                <Tab
                  label={userProfileLocale.externalUser.tabs[TabEnum.YOU_HAVE](userProfile.youHave.quantity)}
                  selected={selectedTab === TabEnum.YOU_HAVE}
                  onPress={() => setSelectedTab(TabEnum.YOU_HAVE)}
                />
              </View>
            </View>

            <ScrollView style={[styles.externalUserAlbuns]}>
              {listToShow.map((item) => (
                <View key={item.name} style={[styles.albumBlockContainer, { borderBottomColor: theme.grey5 }]}>
                  <View style={[styles.blockHead]}>
                    <Text style={[styles.albumNameTitle, { color: theme.primary100 }]}>{item.name}</Text>
                    {item.quantity > 5 && (
                      <Button
                        text={userProfileLocale.externalUser.showAlbum}
                        variant="text"
                        fontSize={14}
                        onClick={() => goToAlbumScreen(item.albumId)}
                      />
                    )}
                  </View>

                  <View style={[styles.stickersContainer]}>
                    {item.stickersList.map((sticker) => (
                      <StickerItem
                        key={sticker.id}
                        myAlbum={false}
                        number={sticker.number}
                        topText={sticker.category}
                        quantity={selectedTab === TabEnum.YOU_HAVE ? 1 : 0}
                        showQuantity={false}
                      />
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  personalInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: '50%',
  },
  personalInfoTopText: {
    fontSize: 18,
    fontFamily: 'primaryBold',
  },
  personalInfoBottomText: {
    fontSize: 14,
    fontFamily: 'primaryMedium',
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
  blockTitle: {
    fontSize: 20,
    fontFamily: 'primaryBold',
  },
  externalUserAlbuns: {
    height: '100%',
  },
  albumBlockContainer: {
    borderBottomWidth: 1,
    padding: 16,
    paddingVertical: 32,
  },
  albumNameTitle: {
    fontSize: 14,
    fontFamily: 'primaryBold',
  },
  profileInfosContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingRight: 32,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    padding: 16,
    paddingBottom: 32,
    borderBottomWidth: 1,
  },
  button: {
    flex: 1,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 16,
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
  albumsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginTop: 16,
    gap: 16,
  },
  stickersContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 24,
    gap: 8,
  },
  externalUserWrapper: {},
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
    borderBottomWidth: 1,
  },
  plusButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 8,
  },
});
