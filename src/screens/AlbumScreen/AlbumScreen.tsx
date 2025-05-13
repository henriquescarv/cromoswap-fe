import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Search from '@/components/Search/Search';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StickerItem } from '../../components/StickerItem';
import { AlbumScreenRouteParams, ChipsTypes, StickersListProps } from './AlbumScreen.types';
import { Chip } from './components/Chip';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AlbumScreen({ navigation }: any) {
  const [filter, setFilter] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);
  const [stickersListByCategory, setStickersListByCategory] = useState<any[][]>([]);
  const [originalStickersList, setOriginalStickersList] = useState<any[]>([]);
  const [filteredList, setFilteredList] = useState<StickersListProps>([]);
  const [displayFilter, setDisplayFilter] = useState(true);

  const {
    albumDetails: albumDetailsStore,
    summary: summaryStore,
    requestAlbumDetails,
    resetAlbumDetails,
    requestUpdateStickersQuantity,
  } = useStore((state: any) => state);

  const stickersQuantity = filteredList.reduce((acc, category) => {
    return acc + category?.length;
  }, 0);

  const route = useRoute<RouteProp< { params: AlbumScreenRouteParams }>>();
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { album: albumLocale } = locale;

  const { albumId, userId: userIdByParam } = route.params;

  const myUserId = summaryStore?.data?.id;
  const userId = userIdByParam || myUserId;

  const checkAndSyncStickersCache = useCallback(async () => {
    const cacheKey = 'stickers_to_update_cache';
    const cacheRaw = await AsyncStorage.getItem(cacheKey);

    let stickersToUpdate = [];

    if (cacheRaw) {
      stickersToUpdate = JSON.parse(cacheRaw);
    }

    if (stickersToUpdate?.length > 0) {
      await requestUpdateStickersQuantity({ stickersToUpdate });
    }
  }, [requestUpdateStickersQuantity]);
  
  useEffect(() => {
    checkAndSyncStickersCache();
  }, [checkAndSyncStickersCache]);

  const getDefaultData = useCallback(() => {
    resetAlbumDetails();
    setFilteredList([]);
    setOriginalStickersList([]);
    setStickersListByCategory([]);
    requestAlbumDetails({ userAlbumId: albumId });
  }, []);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const cleanUpFunction = async () => {
    const cacheKey = 'stickers_to_update_cache';
    const cacheRaw = await AsyncStorage.getItem(cacheKey);

    let stickersToUpdate = [];

    if (cacheRaw) {
      stickersToUpdate = JSON.parse(cacheRaw);
    }

    if (stickersToUpdate?.length > 0) {
      await requestUpdateStickersQuantity({ stickersToUpdate });
    }
  };

  useEffect(() => () => {
    cleanUpFunction();
  }, []);

  const groupStickersByCategory = useCallback((stickersList) => {
    if (!stickersList) return [];

    const grouped: { [category: string]: any[] } = {};
  
    stickersList.forEach(sticker => {
      const category = sticker.category || '';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(sticker);
    });
  
    Object.values(grouped).forEach(arr => arr.sort((a, b) => a.order - b.order));

    const listByCategory = Object.values(grouped);
  
    setStickersListByCategory(listByCategory);
  }, []);

  useEffect(() => {
    if (albumDetailsStore.data?.stickersList) {
      groupStickersByCategory(albumDetailsStore.data?.stickersList);
    }
  }, [albumDetailsStore.data?.stickersList, groupStickersByCategory]);

  useEffect(() => {
    if (albumDetailsStore.data?.stickersList) {
      const originalCopy = albumDetailsStore.data.stickersList.map(sticker => ({ ...sticker }));
      setOriginalStickersList(originalCopy);
      groupStickersByCategory(albumDetailsStore.data.stickersList);
    }
  }, [albumDetailsStore.data?.stickersList, groupStickersByCategory]);

  const stickerPlusAction = async (stickerId) => {
    const sticker = albumDetailsStore.data?.stickersList.find((sticker) => sticker.id === stickerId);
    const originalSticker = originalStickersList.find((s) => s.id === stickerId);

    if (sticker) {
      const stickerQuantity = sticker.quantity || 0;
      const originalQuantity = originalSticker.quantity || 0;
      const newStickerQuantity = stickerQuantity + 1;
  
      stickersListByCategory.forEach((category) => {
        category.forEach((sticker) => {
          if (sticker.id === stickerId) {
            setStickersListByCategory((prevState) => {
              const newState = [...prevState];
              const categoryIndex = newState.findIndex((cat) => cat[0].category === sticker.category);
              if (categoryIndex !== -1) {
                const stickerIndex = newState[categoryIndex].findIndex((s) => s.id === stickerId);
                if (stickerIndex !== -1) {
                  newState[categoryIndex][stickerIndex].quantity = newStickerQuantity;
                }
              }
              return newState;
            });
          }
        });
      });
  
      // Atualiza o AsyncStorage
      try {
        const cacheKey = 'stickers_to_update_cache';
        const cacheRaw = await AsyncStorage.getItem(cacheKey);
        let cache = [] as any[];
        if (cacheRaw) {
          cache = JSON.parse(cacheRaw);
        }
  
        // Verifica se já existe no cache
        const existingIndex = cache.findIndex(item => item.id === stickerId);

  
        if (newStickerQuantity === originalQuantity) {
          // Se a quantidade for igual à original, remove do cache
          if (existingIndex !== -1) {
            cache.splice(existingIndex, 1);
          }
        } else {
          // Se diferente, adiciona ou atualiza no cache
          if (existingIndex !== -1) {
            cache[existingIndex].quantity = newStickerQuantity;
          } else {
            cache.push({ id: stickerId, quantity: newStickerQuantity });
          }
        }
  
        await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));

        // Após await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));
        await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));
      } catch (e) {
        console.error('Erro ao atualizar o cache de stickers:', e);
      }
    }
  };

  const stickerMinusAction = async(stickerId) => {
    const sticker = albumDetailsStore.data?.stickersList.find((sticker) => sticker.id === stickerId);
    const originalSticker = originalStickersList.find((s) => s.id === stickerId);

    if (sticker) {
      const stickerQuantity = sticker.quantity || 0;
      const originalQuantity = originalSticker.quantity || 0;
      const newStickerQuantity = stickerQuantity - 1;
  
      stickersListByCategory.forEach((category) => {
        category.forEach((sticker) => {
          if (sticker.id === stickerId) {
            setStickersListByCategory((prevState) => {
              const newState = [...prevState];
              const categoryIndex = newState.findIndex((cat) => cat[0].category === sticker.category);
              if (categoryIndex !== -1) {
                const stickerIndex = newState[categoryIndex].findIndex((s) => s.id === stickerId);
                if (stickerIndex !== -1) {
                  newState[categoryIndex][stickerIndex].quantity = newStickerQuantity;
                }
              }
              return newState;
            });
          }
        });
      });
  
      // Atualiza o AsyncStorage
      try {
        const cacheKey = 'stickers_to_update_cache';
        const cacheRaw = await AsyncStorage.getItem(cacheKey);
        let cache = [] as any[];
        if (cacheRaw) {
          cache = JSON.parse(cacheRaw);
        }
  
        // Verifica se já existe no cache
        const existingIndex = cache.findIndex(item => item.id === stickerId);
  
        if (newStickerQuantity === originalQuantity) {
          // Se a quantidade for igual à original, remove do cache
          if (existingIndex !== -1) {
            cache.splice(existingIndex, 1);
          }
        } else {
          // Se diferente, adiciona ou atualiza no cache
          if (existingIndex !== -1) {
            cache[existingIndex].quantity = newStickerQuantity;
          } else {
            cache.push({ id: stickerId, quantity: newStickerQuantity });
          }
        }
  
        await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));

        // Após await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));
        await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));
      } catch (e) {
        console.error('Erro ao atualizar o cache de stickers:', e);
      }
    }
  };

  // const album = useMemo(() => ({
  //   id: 1,
  //   userAlbumId: 12345,
  //   name: 'Copa do Mundo 2022',
  //   totalStickers: 600,
  //   stickersListByCategory: [
  //     [
  //       { id: 1, order: 1, number: '001', category: 'BRA', quantity: 0, youHave: true, youNeed: false },
  //       { id: 2, order: 2, number: '002', category: 'BRA', quantity: 1, youHave: true, youNeed: true },
  //       { id: 3, order: 3, number: '003', category: 'BRA', quantity: 2, youHave: false, youNeed: true },
  //       { id: 4, order: 4, number: '004', category: 'BRA', quantity: 0, youHave: false, youNeed: true },
  //       { id: 5, order: 5, number: '005', category: 'BRA', quantity: 0, youHave: false, youNeed: true },
  //       { id: 6, order: 6, number: '006', category: 'BRA', quantity: 0, youHave: false, youNeed: true },
  //       { id: 7, order: 7, number: '007', category: 'BRA', quantity: 0, youHave: false, youNeed: true },
  //       { id: 8, order: 8, number: '008', category: 'BRA', quantity: 0, youHave: false, youNeed: false },
  //       { id: 9, order: 9, number: '009', category: 'BRA', quantity: 0, youHave: true, youNeed: false },
  //       { id: 10, order: 10, number: '010', category: 'BRA', quantity: 0, youHave: true, youNeed: false },
  //     ],
  //   ],
  // }), []);

  const isExternalUserAlbum = userId !== myUserId;

  const mountChipsList = useCallback(() => {
    const list = [
      {
        id: ChipsTypes.HAVE,
        label: isExternalUserAlbum ? albumLocale.filterChips.userHave : albumLocale.filterChips.iHave,
        value: ChipsTypes.HAVE
      },
      { id: ChipsTypes.MISSING,
        label: isExternalUserAlbum ? albumLocale.filterChips.userMissing : albumLocale.filterChips.iMissing,
        value: ChipsTypes.MISSING
      },
      { id: ChipsTypes.REPEATED,
        label: isExternalUserAlbum ? albumLocale.filterChips.userRepeated : albumLocale.filterChips.myRepeated,
        value: ChipsTypes.REPEATED
      },
    ];

    if (isExternalUserAlbum) {
      list.push({ id: ChipsTypes.YOU_NEED, label: albumLocale.filterChips.youNeed, value: ChipsTypes.YOU_NEED });
      list.push({ id: ChipsTypes.YOU_HAVE, label: albumLocale.filterChips.youHave, value: ChipsTypes.YOU_HAVE });
    }

    return list;
  }, [isExternalUserAlbum]);

  const chipsList = mountChipsList();

  const handleSelectChip = (chip) => {
    if (selectedChip === chip.value) {
      setSelectedChip(null);
      return;
    }

    setSelectedChip(chip.value);
  }

  const filterStickers = useCallback(() => {
    const filterByChip = (sticker) => {
      if (selectedChip === ChipsTypes.HAVE) {
        return sticker.quantity > 0;
      }
      if (selectedChip === ChipsTypes.MISSING) {
        return sticker.quantity === 0;
      }
      if (selectedChip === ChipsTypes.REPEATED) {
        return sticker.quantity > 1;
      }
      if (selectedChip === ChipsTypes.YOU_NEED) {
        return sticker.youNeed;
      }
      if (selectedChip === ChipsTypes.YOU_HAVE) {
        return sticker.youHave;
      }
      return true;
    }

    if (filter === '' && selectedChip === null) {
      setFilteredList(stickersListByCategory);
      return;
    }

    let filtered = stickersListByCategory.map(category => {
      return category?.filter(sticker => {
        return filterByChip(sticker);
      })
    });

    filtered = filtered.map(category => {
      return category?.filter(sticker => {
        return sticker?.number.includes(filter) || sticker?.category?.includes(filter.toUpperCase());
      })
    });

    setFilteredList(filtered);
  }, [filter, stickersListByCategory, selectedChip]);

  useEffect(() => {
    filterStickers();
  }, [filterStickers]);

  const handleClearFilters = () => {
    setFilter('');
    setSelectedChip(null);
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (albumDetailsStore.loading || !albumDetailsStore.data) {
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
      <View style={[styles.headBlock, { borderColor: theme.grey5 }]}>
        <View style={[styles.headContainer]}>
          <TouchableOpacity onPress={goBack} style={[styles.goBackIconWrapper]}>
            <Ionicons
              name={"chevron-back-outline"}
              size={32}
              color={theme.primary50}
            />
          </TouchableOpacity>

          <View style={[styles.albumInfos]}>
            <Text style={[styles.albumName, { color: theme.primary100 }]}>
              {albumDetailsStore.data?.name}
              <Text style={[styles.stickersCount, { color: theme.grey20 }]}>{` (${albumDetailsStore.data?.totalStickers})`}</Text>
            </Text>
          </View>

          <TouchableOpacity onPress={() => setDisplayFilter(!displayFilter)} style={[styles.filterButton]}>
            <Ionicons
              name={`funnel${displayFilter ? '' : '-outline'}`}
              size={24}
              color={theme.primary50}
            />
          </TouchableOpacity>
        </View>

        {displayFilter && (
          <View style={[styles.filter]}>
            <Search
              placeholder={albumLocale.searchPlaceholder}
              onChangeText={setFilter}
              value={filter}
            />

            <View style={[styles.chipsContainer]}>
              {chipsList.map((chip) => (
                <Chip
                  key={chip.id}
                  label={chip.label}
                  selected={selectedChip === chip.value}
                  onPress={() => handleSelectChip(chip)}
                />
              ))}
            </View>

            <View style={[styles.buttonContainer]}>
              <Button
                text={albumLocale.clearFilters}
                variant="text"
                onClick={handleClearFilters}
                fontSize={14}
              />
            </View>
          </View>
        )}
      </View>

      <ScrollView
        style={[styles.contentWrapper]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.stickersQty, { color: theme.grey20 }]}>{albumLocale.stickersQty(stickersQuantity)}</Text>

        <View style={[styles.blockContainer]}>
          {filteredList.map((list) => !!list?.length && (
            <View key={list[0]?.category} style={[styles.categoryListContainer]}>
              {!!list[0]?.category && <Text>{list[0]?.category}</Text>}

              <View style={[styles.stickersContainer]}>
                {list.map((item) => (
                  <StickerItem
                    key={item.id}
                    number={item.number}
                    quantity={item.quantity}
                    myAlbum={!isExternalUserAlbum}
                    plusAction={() => stickerPlusAction(item.id)}
                    minusAction={() => stickerMinusAction(item.id)}
                  />
                ))}
              </View>
            </View>
          ))}
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    gap: 16,
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    marginBottom: 16,
  },
  goBackIconWrapper: {
    position: 'absolute',
  },
  filterButton: {
    position: 'absolute',
    right: 0,
    marginRight: 8,
  },
  filter: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  chipsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  contentWrapper: {
    flex: 1,
    display: 'flex',
    width: '100%',
  },
  stickersQty: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    width: '100%',
    textAlign: 'center',
    marginTop: 16,
  },
  blockContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
  albumInfos: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    marginHorizontal: 48,
  },
  albumName: {
    fontSize: 16,
    fontFamily: 'primaryBold',
    flex: 1,
    textAlign: 'center',
  },
  stickersCount: {
    fontSize: 16,
    fontFamily: 'primaryRegular',
  },
  stickersContainer: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    width: '100%',
  },
  categoryListContainer: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'primaryBold',
  },
});