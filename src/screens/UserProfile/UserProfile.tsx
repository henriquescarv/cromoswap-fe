import { Album } from "@/components/Album";
import Button from "@/components/Button/Button";
import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tab } from "./components/Tab";
import { TabEnum, UserProfileProps } from "./UserProfile.types";
import { StickerItem } from "../../components/StickerItem";
import { ScrollView } from "react-native-gesture-handler";
import useStore from "@/services/store";

export default function UserProfile({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState<keyof typeof TabEnum>(TabEnum.YOU_NEED);
  const insets = useSafeAreaInsets();

  const {
    summary: summaryStore,
    userAlbums: userAlbumsStore,
    externalUserProfile: externalUserProfileStore,
    requestSummary,
    requestUserAlbums,
    requestExternalUserProfile,
    requestChangeUserData,
    requestFollowUser,
    requestUnfollowUser,
    logout
  } = useStore((state: any) => state);

  const route = useRoute<any>();
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { userProfile: userProfileLocale } = locale;

  const myUserId = summaryStore.data?.id;
  const userId = route?.params?.userId || myUserId;

  const isExternalUser = !!route?.params?.userId && route?.params?.userId !== myUserId;

  const getDefaultData = useCallback(() => {
    if (isExternalUser) {
      requestExternalUserProfile({ userId });
    } else {
      requestSummary();
      requestUserAlbums();
    }
  }, [isExternalUser]);

  useEffect(() => {
    getDefaultData()
  }, [getDefaultData])

  const myUserProfile: UserProfileProps = {
    ...summaryStore.data,
    albums: userAlbumsStore.list || [],
    youNeed: summaryStore.data?.youNeed || null,
    youHave: summaryStore.data?.youHave || null,
  };

  const externalUserProfile = {
    ...externalUserProfileStore.data,
  };

  const userProfile = isExternalUser ? externalUserProfile : myUserProfile;

  const listToShow = selectedTab === TabEnum.YOU_NEED ? userProfile?.youNeed?.list : userProfile?.youHave?.list;

  const mountUserAvatar = () => {
    if (userProfile.avatar) {
      return userProfile.avatar;
    }

    return <Ionicons name="person" size={32} color={theme.primary100} />;
  }

  const userAvatar = mountUserAvatar();

  const handleLogout = useCallback(() => {
    logout();
  }, [])

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goToAlbumScreen = (albumId: number) => {
    navigation.navigate('AlbumScreen', { albumId, userId });
  };

  const goToExternalUserAlbumsScreen = () => {
    navigation.navigate('ExternalUserAlbumsScreen', { userId });
  };

  const goToChooseAlbumScreen = () => {
    navigation.navigate('ChooseAlbumScreen');
  };

  const goToFollowList = ({ type = "followers", userId }: { type: "followers" | "following", userId: number | string }) => {
    navigation.navigate('FollowListScreen', { type, userId });
  };

  const goToChatScreen = () => {
    navigation.navigate('ChatScreen', { userId });
  };

  const mountPersonalInfo = ({ topText, bottomText, onPress }: { topText?: string | number; bottomText: string, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={[styles.personalInfo]}>
      <Text style={[styles.personalInfoTopText, { color: theme.primary100 }]}>{topText}</Text>
      <Text style={[styles.personalInfoBottomText, { color: theme.primary100 }]}>{bottomText}</Text>
    </TouchableOpacity>
  );

  const mountButtons = () => {
    const handleClickFollowButton = () => {
      if (externalUserProfileStore.data?.isFollowing) {
        requestUnfollowUser({ userId, requestFrom: "UserProfile" });
        return;
      }

      requestFollowUser({ userId, requestFrom: "UserProfile" });
    };

    const followButtonText = externalUserProfileStore.data?.isFollowing ? userProfileLocale.unfollow : userProfileLocale.follow;

    return isExternalUser ? (
      <>
        <View style={[styles.button]}>
          <Button
            text={followButtonText}
            variant="secondary"
            onClick={handleClickFollowButton}
            size="small"
            fontSize={14}
            color={externalUserProfileStore.data?.isFollowing ? 'grey20' : 'primary50'}
          />
        </View>
        <View style={[styles.button]}>
          <Button
            text={userProfileLocale.sendMessage}
            variant="secondary"
            onClick={goToChatScreen}
            size="small"
            fontSize={14}
          />
        </View>
      </>
    ) : (
      <>
        <View style={[styles.button]}>
          <Button
            text={userProfileLocale.editProfile}
            variant="secondary"
            onClick={handleEditProfile}
            size="small"
            color="primary50"
          />
        </View>
        <View style={[styles.button]}>
          <Button
            text={userProfileLocale.leave}
            variant="secondary"
            onClick={handleLogout}
            size="small"
            color="primaryRed"
          />
        </View>
      </>
    );
  };

  if (userAlbumsStore.loading || summaryStore.loading || externalUserProfileStore.loading) {
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

              <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{userProfile.username}</Text>
            </View>
          </View>

          <View style={[styles.profileInfosContainer]}>
            <View style={[styles.avatar, { backgroundColor: theme.primary10 }]}>
              {userAvatar}
            </View>
            {mountPersonalInfo({ topText: userProfile?.albums?.length, bottomText: userProfileLocale.albums, onPress: () => goToExternalUserAlbumsScreen() })}
            {mountPersonalInfo({ topText: userProfile.followers || 0, bottomText: userProfileLocale.followers, onPress: () => goToFollowList({ type: 'followers', userId }) })}
            {mountPersonalInfo({ topText: userProfile.following || 0, bottomText: userProfileLocale.following, onPress: () => goToFollowList({ type: 'following', userId }) })}
          </View>

          <View style={[styles.buttonsContainer, { borderBottomColor: !isExternalUser ? theme.grey5 : 'transparent' }]}>
            {mountButtons()}
          </View>

          <View style={[styles.contentWrapper]}>
            {!isExternalUser && (
              <View style={[styles.blockContainer]}>
                <View style={[styles.blockHead]}>
                  <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{userProfileLocale.yourAlbums}</Text>
                  {userProfile?.albums?.length > 5 && (
                    <Button
                      text={userProfileLocale.seeMore}
                      variant="text"
                      fontSize={16}
                      onClick={goToExternalUserAlbumsScreen}
                    />
                  )}
                </View>

                <View style={[styles.albumsContainer]}>
                  {userProfile?.albums?.slice(0, 4).map((item) => (
                    <Album
                      key={item.id}
                      name={item.name}
                      image={item.image}
                      percentCompleted={item.percentCompleted}
                      onClick={() => goToAlbumScreen(item.userAlbumId)}
                    />
                  ))}

                  {!userProfile?.albums?.length && (
                    <View style={[styles.emptyStateContainer]}>
                      <Text style={[styles.emptyStateText, { color: theme.primary100 }]}>{userProfileLocale.noAlbums}</Text>
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
            )}

            {isExternalUser && (
              <>
                <View style={[styles.externalUserWrapper]}>
                  <View style={[styles.tabsContainer, { borderColor: theme.grey5 }]}>
                    <Tab
                      label={userProfileLocale.externalUser.tabs[TabEnum.YOU_NEED](userProfile?.youNeed?.quantity || 0)}
                      selected={selectedTab === TabEnum.YOU_NEED}
                      onPress={() => setSelectedTab(TabEnum.YOU_NEED)}
                    />
                    <Tab
                      label={userProfileLocale.externalUser.tabs[TabEnum.YOU_HAVE](userProfile?.youHave?.quantity || 0)}
                      selected={selectedTab === TabEnum.YOU_HAVE}
                      onPress={() => setSelectedTab(TabEnum.YOU_HAVE)}
                    />
                  </View>
                </View>

                <ScrollView style={[styles.externalUserAlbuns]}>
                  {listToShow?.map((item) => (
                    <View key={item.name} style={[styles.albumBlockContainer, { borderBottomColor: theme.grey5 }]}>
                      <View style={[styles.blockHead]}>
                        <Text style={[styles.albumNameTitle, { color: theme.primary100 }]}>{item.name}</Text>

                        <Button
                          text={userProfileLocale.externalUser.showAlbum}
                          variant="text"
                          fontSize={14}
                          onClick={() => goToAlbumScreen(item.userAlbumId)}
                        />
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
  },
  loadingWrapper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyStateContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 120,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'primaryMedium',
    textAlign: 'center',
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
