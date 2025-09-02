import React, { useState, useCallback, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import useStore from '@/services/store';
import { useRoute } from '@react-navigation/native';
import { Pagination } from '@/components/Pagination';
import StickerButton from '@/components/StickerButton';
import Search from '@/components/Search/Search';
import Button from '@/components/Button/Button';
import { Chip } from '../AlbumScreen/components/Chip';
import { ChipsTypes } from '../AlbumScreen/AlbumScreen.types';
import { 
  RealStickerType, 
  AlbumScreenV2Props, 
  ScreenDimensions, 
  StickerUpdate 
} from './AlbumScreenV2.types';
import { useLayoutCalculations } from './useLayoutCalculations';

export default function AlbumScreenV2({ navigation }: AlbumScreenV2Props) {
  const [stickers, setStickers] = useState<RealStickerType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [changedStickers, setChangedStickers] = useState<Map<number, number>>(new Map());
  const [screenData, setScreenData] = useState<ScreenDimensions>(Dimensions.get('window'));
  const [isSendingChanges, setIsSendingChanges] = useState(false);
  
  // Estados para filtros (sem funcionalidade por enquanto)
  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [selectedChip, setSelectedChip] = useState<ChipsTypes | null>(null);
  const [displayFilter, setDisplayFilter] = useState(true);
  const [isExitingWithChanges, setIsExitingWithChanges] = useState(false);
  
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { album: albumLocale } = locale;
  const route = useRoute<any>();
  const { numColumns: actualNumColumns, itemWidth, buttonHeight } = useLayoutCalculations(screenData);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window);
    });

    return () => subscription?.remove();
  }, []);

  // Debounce para o filtro de texto
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500); // 500ms de delay

    return () => clearTimeout(timer);
  }, [filter]);

  const {
    albumDetails: albumDetailsStore,
    summary: summaryStore,
    requestAlbumDetails,
    resetAlbumDetails,
    requestUpdateStickersQuantity,
  } = useStore((state: any) => state);

  const { albumId } = route.params || {};

  // Funções para gerenciar filtros (sem funcionalidade por enquanto)
  const mountChipsList = useCallback(() => {
    const isExternalUserAlbum = false; // Por enquanto sempre false
    
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
  }, [albumLocale]);

  const chipsList = mountChipsList();

  const handleSelectChip = useCallback((chip: any) => {
    if (selectedChip === chip.value) {
      setSelectedChip(null);
    } else {
      setSelectedChip(chip.value);
    }
    setCurrentPage(1);
  }, [selectedChip]);

  const handleClearFilters = useCallback(() => {
    setFilter('');
    setDebouncedFilter('');
    setSelectedChip(null);
    setCurrentPage(1);
  }, []);

  // Função para mapear o chip selecionado para o valor da API
  const getOwnershipValue = useCallback((chipValue: ChipsTypes | null) => {
    switch (chipValue) {
      case ChipsTypes.HAVE:
        return 'collected';
      case ChipsTypes.MISSING:
        return 'missing';
      case ChipsTypes.REPEATED:
        return 'duplicate';
      default:
        return undefined;
    }
  }, []);

  useEffect(() => {
    if (albumId) {
      const applyFiltersAndFetch = async () => {
        // Se há mudanças pendentes, envia primeiro
        if (changedStickers.size > 0) {
          setIsSendingChanges(true); // Ativa loading
          
          const stickersToUpdate: StickerUpdate[] = [];
          changedStickers.forEach((quantity, id) => {
            stickersToUpdate.push({ id, quantity });
          });

          try {
            await requestUpdateStickersQuantity({ stickersToUpdate });
            setChangedStickers(new Map()); // Limpa as mudanças após enviar
          } catch (error) {
            console.error('Error updating stickers before filtering:', error);
            // Continua com o filtro mesmo se houver erro
          } finally {
            setIsSendingChanges(false); // Desativa loading
          }
        }

        // Aplica os filtros
        const ownership = getOwnershipValue(selectedChip);
        const terms = debouncedFilter.trim() || undefined;

        requestAlbumDetails({
          userAlbumId: albumId,
          page: currentPage,
          maxStickers: 100,
          ownership,
          terms
        });
      };

      applyFiltersAndFetch();
    }
  }, [albumId, currentPage, requestAlbumDetails, selectedChip, debouncedFilter, getOwnershipValue, requestUpdateStickersQuantity]);

  // Reset da página quando os filtros mudam
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [selectedChip, debouncedFilter]);

  useEffect(() => {
    if (albumDetailsStore.data?.stickersList) {
      const stickersCopy = [...albumDetailsStore.data.stickersList];
      
      stickersCopy.forEach(sticker => {
        if (changedStickers.has(sticker.id)) {
          sticker.quantity = changedStickers.get(sticker.id)!;
        }
      });
      
      setStickers(stickersCopy);
    }
  }, [albumDetailsStore.data?.stickersList]);

  useEffect(() => {
    if (albumDetailsStore.data?.stickersList && changedStickers.size > 0) {
      const stickersCopy = [...albumDetailsStore.data.stickersList];
      
      stickersCopy.forEach(sticker => {
        if (changedStickers.has(sticker.id)) {
          sticker.quantity = changedStickers.get(sticker.id)!;
        }
      });
      
      setStickers(stickersCopy);
    }
  }, [changedStickers, albumDetailsStore.data?.stickersList]);

  const cleanUpFunction = useCallback(async () => {
    if (changedStickers.size === 0) {
      return;
    }

    setIsSendingChanges(true); // Ativa loading

    const stickersToUpdate: StickerUpdate[] = [];

    changedStickers.forEach((quantity, id) => {
      stickersToUpdate.push({ id, quantity });
    });

    if (stickersToUpdate.length > 0) {
      try {
        await requestUpdateStickersQuantity({ stickersToUpdate });
        
        setChangedStickers(new Map());
      } catch (error) {
        console.error('Error updating stickers:', error);
        throw error;
      } finally {
        setIsSendingChanges(false); // Desativa loading
      }
    }
  }, [changedStickers, requestUpdateStickersQuantity]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (changedStickers.size === 0) {
        return;
      }

      e.preventDefault();
      setIsExitingWithChanges(true);

      cleanUpFunction().then(() => {
        setIsExitingWithChanges(false);
        navigation.dispatch(e.data.action);
      }).catch(() => {
        setIsExitingWithChanges(false);
      });
    });

    return unsubscribe;
  }, [navigation, changedStickers.size, cleanUpFunction]);

  const incrementQuantity = useCallback((id: number) => {
    setStickers(prevStickers =>
      prevStickers.map(sticker =>
        sticker.id === id
          ? { ...sticker, quantity: sticker.quantity + 1 }
          : sticker
      )
    );

    setChangedStickers(prev => {
      const newMap = new Map(prev);
      const currentSticker = stickers.find(s => s.id === id);
      if (currentSticker) {
        newMap.set(id, currentSticker.quantity + 1);
      }
      return newMap;
    });
  }, [stickers]);

  const decrementQuantity = useCallback((id: number) => {
    setStickers(prevStickers =>
      prevStickers.map(sticker =>
        sticker.id === id && sticker.quantity > 0
          ? { ...sticker, quantity: sticker.quantity - 1 }
          : sticker
      )
    );

    setChangedStickers(prev => {
      const newMap = new Map(prev);
      const currentSticker = stickers.find(s => s.id === id);
      if (currentSticker && currentSticker.quantity > 0) {
        newMap.set(id, currentSticker.quantity - 1);
      }
      return newMap;
    });
  }, [stickers]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const testSendChanges = useCallback(async () => {
    if (isSendingChanges) return;
    
    setIsSendingChanges(true);
    
    try {
      await cleanUpFunction();
    } catch (error) {
      console.error('Error sending changes:', error);
    } finally {
      setIsSendingChanges(false);
    }
  }, [cleanUpFunction, isSendingChanges]);

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

  const renderStickerButton = useCallback(({ item }: { item: RealStickerType }) => (
    <StickerButton 
      item={item} 
      onPlusPress={incrementQuantity} 
      onMinusPress={decrementQuantity}
      theme={theme}
      itemWidth={itemWidth}
      buttonHeight={buttonHeight}
    />
  ), [incrementQuantity, decrementQuantity, theme, itemWidth, buttonHeight]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (albumDetailsStore.loading || !albumDetailsStore.data) {
    return (
      <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
        <View style={[styles.loadingWrapper]}>
          <ActivityIndicator
            size="large"
            color={theme.primary50}
          />
          <Text style={[styles.loadingText, { color: theme.primary100 }]}>
            Carregando stickers...
          </Text>
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
              {albumDetailsStore.data?.name || 'Album Screen V2'}
              <Text style={[styles.stickersCount, { color: theme.grey20 }]}>{` (${albumDetailsStore.data?.totalStickers || 0})`}</Text>
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
          { paddingBottom: changedStickers.size > 0 ? 120 : 16 }
        ]}
        style={styles.flatList}
        ListFooterComponent={renderPagination}
        removeClippedSubviews={true}
        maxToRenderPerBatch={25}
        windowSize={5}
        initialNumToRender={25}
        updateCellsBatchingPeriod={30}
        viewabilityConfig={{
          waitForInteraction: false,
          itemVisiblePercentThreshold: 25,
        }}
        scrollEventThrottle={16}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
      />
      
      {changedStickers.size > 0 && (
        <View style={[styles.bottomButtonContainer, { backgroundColor: theme.highLight }]}>
          <TouchableOpacity 
            style={[
              styles.bottomButton, 
              { 
                backgroundColor: isSendingChanges ? theme.grey20 : theme.primary50,
                opacity: isSendingChanges ? 0.7 : 1 
              }
            ]}
            onPress={testSendChanges}
            disabled={isSendingChanges}
          >
            {isSendingChanges ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={theme.highLight} />
                <Text style={[styles.bottomButtonText, { color: theme.highLight }]}>
                  {isExitingWithChanges ? 'Salvando para sair...' : 'Enviando...'}
                </Text>
              </View>
            ) : (
              <Text style={[styles.bottomButtonText, { color: theme.highLight }]}>
                Enviar Mudanças ({changedStickers.size})
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
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
  header: {
    padding: 16,
    alignItems: 'center',
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'primaryMedium',
  },
  title: {
    fontSize: 24,
    fontFamily: 'primaryBold',
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 8,
  },
  gridContainer: {
    paddingVertical: 8,
    justifyContent: 'flex-start',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  bottomButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  bottomButtonText: {
    fontSize: 16,
    fontFamily: 'primaryBold',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
