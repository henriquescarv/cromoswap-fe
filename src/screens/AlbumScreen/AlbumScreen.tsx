import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Search from '@/components/Search/Search';
import { RouteProp, useRoute } from '@react-navigation/native';
import StickerButton from '@/components/StickerButton';
import { Pagination } from '@/components/Pagination';
import { AlbumScreenRouteParams, ChipsTypes } from './AlbumScreen.types';
import { Chip } from './components/Chip';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutCalculations } from './useLayoutCalculations';

export default function AlbumScreen({ navigation }: any) {
  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);
  const [stickers, setStickers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayFilter, setDisplayFilter] = useState(true);
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [isSyncingCache, setIsSyncingCache] = useState(false);

  const {
    albumDetails: albumDetailsStore,
    summary: summaryStore,
    requestAlbumDetails,
    resetAlbumDetails,
    requestUpdateStickersQuantity,
  } = useStore((state: any) => state);

  const stickersQuantity = stickers.length;

  const route = useRoute<RouteProp<{ params: AlbumScreenRouteParams }>>();
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { album: albumLocale } = locale;

  const { albumId, userId: userIdByParam } = route.params;

  const myUserId = summaryStore?.data?.id;
  const userId = userIdByParam || myUserId;

  const { numColumns: actualNumColumns, itemWidth, buttonHeight } = useLayoutCalculations(screenData);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500);

    return () => clearTimeout(timer);
  }, [filter]);

  const checkAndSyncStickersCache = useCallback(async () => {
    const cacheKey = 'stickers_to_update_cache';
    const cacheRaw = await AsyncStorage.getItem(cacheKey);

    let stickersToUpdate = [];

    if (cacheRaw) {
      stickersToUpdate = JSON.parse(cacheRaw);
    }

    if (stickersToUpdate?.length > 0) {
      await requestUpdateStickersQuantity({ stickersToUpdate });
      await AsyncStorage.removeItem(cacheKey);
    }
  }, [requestUpdateStickersQuantity]);

  const syncCacheBeforeAction = useCallback(async () => {
    const cacheKey = 'stickers_to_update_cache';
    const cacheRaw = await AsyncStorage.getItem(cacheKey);

    if (cacheRaw) {
      const stickersToUpdate = JSON.parse(cacheRaw);

      if (stickersToUpdate?.length > 0) {
        setIsSyncingCache(true);
        try {
          await requestUpdateStickersQuantity({ stickersToUpdate });
          await AsyncStorage.removeItem(cacheKey);
        } catch (error) {
          console.error('Error updating stickers before action:', error);
        } finally {
          setIsSyncingCache(false);
        }
      }
    }
  }, [requestUpdateStickersQuantity]);

  useEffect(() => {
    checkAndSyncStickersCache();
  }, [checkAndSyncStickersCache]);

  const getOwnershipValue = useCallback((chipValue: ChipsTypes | null) => {
    switch (chipValue) {
      case ChipsTypes.HAVE:
        return 'collected';
      case ChipsTypes.MISSING:
        return 'missing';
      case ChipsTypes.REPEATED:
        return 'duplicate';
      case ChipsTypes.YOU_NEED:
        return 'you_need';
      case ChipsTypes.YOU_HAVE:
        return 'you_have';
      default:
        return undefined;
    }
  }, []);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [selectedChip, debouncedFilter]);

  useEffect(() => {
    if (albumId) {
      const applyFiltersAndFetch = async () => {
        await syncCacheBeforeAction();

        const ownership = getOwnershipValue(selectedChip);
        const terms = debouncedFilter.trim() || undefined;

        requestAlbumDetails({
          userAlbumId: albumId,
          page: currentPage,
          maxStickers: 70,
          ownership,
          terms
        });
      };

      applyFiltersAndFetch();
    }
  }, [albumId, currentPage, requestAlbumDetails, selectedChip, debouncedFilter, getOwnershipValue, syncCacheBeforeAction]);

  useEffect(() => {
    if (albumDetailsStore.data?.stickersList) {
      setStickers([...albumDetailsStore.data.stickersList]);
    }
  }, [albumDetailsStore.data?.stickersList]);

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

    resetAlbumDetails();
  };

  useEffect(() => () => {
    cleanUpFunction();
  }, []);

  const stickerPlusAction = async (stickerId) => {
    const sticker = stickers.find((sticker) => sticker.id === stickerId);

    if (sticker) {
      const stickerQuantity = sticker.quantity || 0;
      const newStickerQuantity = stickerQuantity + 1;

      setStickers(prevStickers =>
        prevStickers.map(s =>
          s.id === stickerId
            ? { ...s, quantity: newStickerQuantity }
            : s
        )
      );

      try {
        const cacheKey = 'stickers_to_update_cache';
        const cacheRaw = await AsyncStorage.getItem(cacheKey);
        let cache = [] as any[];
        if (cacheRaw) {
          cache = JSON.parse(cacheRaw);
        }

        const existingIndex = cache.findIndex(item => item.id === stickerId);

        if (existingIndex !== -1) {
          cache[existingIndex].quantity = newStickerQuantity;
        } else {
          cache.push({ id: stickerId, quantity: newStickerQuantity });
        }

        await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));
      } catch (e) {
        console.error('Erro ao atualizar o cache de stickers:', e);
      }
    }
  };

  const stickerMinusAction = async (stickerId) => {
    const sticker = stickers.find((sticker) => sticker.id === stickerId);

    if (sticker) {
      const stickerQuantity = sticker.quantity || 0;
      const newStickerQuantity = stickerQuantity - 1;

      setStickers(prevStickers =>
        prevStickers.map(s =>
          s.id === stickerId && s.quantity > 0
            ? { ...s, quantity: newStickerQuantity }
            : s
        )
      );

      try {
        const cacheKey = 'stickers_to_update_cache';
        const cacheRaw = await AsyncStorage.getItem(cacheKey);
        let cache = [] as any[];
        if (cacheRaw) {
          cache = JSON.parse(cacheRaw);
        }

        // Verifica se já existe no cache
        const existingIndex = cache.findIndex(item => item.id === stickerId);

        if (existingIndex !== -1) {
          cache[existingIndex].quantity = newStickerQuantity;
        } else {
          cache.push({ id: stickerId, quantity: newStickerQuantity });
        }

        await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));
      } catch (e) {
        console.error('Erro ao atualizar o cache de stickers:', e);
      }
    }
  };

  const isExternalUserAlbum = userId !== myUserId;

  const mountChipsList = useCallback(() => {
    const list = [
      {
        id: ChipsTypes.HAVE,
        label: isExternalUserAlbum ? albumLocale.filterChips.userHave : albumLocale.filterChips.iHave,
        value: ChipsTypes.HAVE
      },
      {
        id: ChipsTypes.MISSING,
        label: isExternalUserAlbum ? albumLocale.filterChips.userMissing : albumLocale.filterChips.iMissing,
        value: ChipsTypes.MISSING
      },
      {
        id: ChipsTypes.REPEATED,
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

  const handleSelectChip = async (chip) => {
    await syncCacheBeforeAction();

    if (selectedChip === chip.value) {
      setSelectedChip(null);
      return;
    }

    setSelectedChip(chip.value);
    setCurrentPage(1);
  }

  const handleClearFilters = async () => {
    await syncCacheBeforeAction();

    setFilter('');
    setDebouncedFilter('');
    setSelectedChip(null);
    setCurrentPage(1);
  };

  const handlePageChange = useCallback(async (page: number) => {
    await syncCacheBeforeAction();

    setCurrentPage(page);
  }, [syncCacheBeforeAction]);

  const renderPagination = useCallback(() => {
    if (!albumDetailsStore.data?.pagination) {
      return null;
    }

    return (
      <Pagination
        currentPage={albumDetailsStore.data.pagination.currentPage}
        totalPages={albumDetailsStore.data.pagination.totalPages}
        onPageChange={handlePageChange}
        categoriesInPage={albumDetailsStore.data.pagination.categoriesInPage}
      />
    );
  }, [albumDetailsStore.data?.pagination, handlePageChange]);

  const renderStickerButton = useCallback(({ item }: { item: any }) => (
    <StickerButton
      item={item}
      onPlusPress={stickerPlusAction}
      onMinusPress={stickerMinusAction}
      theme={theme}
      itemWidth={itemWidth}
      buttonHeight={buttonHeight}
      myAlbum={!isExternalUserAlbum}
    />
  ), [stickerPlusAction, stickerMinusAction, theme, itemWidth, buttonHeight, isExternalUserAlbum]);

  const goBack = () => {
    navigation.goBack();
  };

  if (albumDetailsStore.loading || !albumDetailsStore.data || isSyncingCache) {
    return (
      <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
        <View style={[styles.loadingWrapper]}>
          <ActivityIndicator
            size="large"
            color={theme.primary50}
            style={[styles.wrapper]}
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

      <FlatList
        key={`${screenData.width}-${screenData.height}`}
        data={stickers}
        renderItem={renderStickerButton}
        keyExtractor={(item) => item.id.toString()}
        numColumns={actualNumColumns}
        contentContainerStyle={[
          styles.gridContainer,
          { paddingBottom: 16 }
        ]}
        style={styles.flatList}
        ListHeaderComponent={() => (
          <Text style={[styles.stickersQty, { color: theme.grey20 }]}>
            {albumLocale.stickersQty(stickersQuantity)}
          </Text>
        )}
        ListFooterComponent={renderPagination}
        removeClippedSubviews={true}
        maxToRenderPerBatch={12}
        windowSize={3}
        initialNumToRender={12}
        updateCellsBatchingPeriod={30}
        viewabilityConfig={{
          waitForInteraction: false,
          itemVisiblePercentThreshold: 12,
        }}
        scrollEventThrottle={16}
        automaticallyAdjustContentInsets={false}
        onContentSizeChange={() => { }}
      />
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
  loadingText: {
    fontSize: 16,
    fontFamily: 'primaryRegular',
    marginTop: 16,
    textAlign: 'center',
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
  flatList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  gridContainer: {
    paddingVertical: 8,
    justifyContent: 'flex-start',
  },
  stickersQty: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    width: '100%',
    textAlign: 'center',
    marginBottom: 16,
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
});