import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import useStore from '@/services/store';
import { useRoute } from '@react-navigation/native';
import { Pagination } from '@/components/Pagination';
import StickerButton from '@/components/StickerButton';
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
  
  const { theme } = useTheme();
  const route = useRoute<any>();
  const { numColumns: actualNumColumns, itemWidth, buttonHeight } = useLayoutCalculations(screenData);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window);
    });

    return () => subscription?.remove();
  }, []);

  const {
    albumDetails: albumDetailsStore,
    summary: summaryStore,
    requestAlbumDetails,
    resetAlbumDetails,
    requestUpdateStickersQuantity,
  } = useStore((state: any) => state);

  const { albumId } = route.params || {};

  useEffect(() => {
    if (albumId) {
      requestAlbumDetails({ userAlbumId: albumId, page: currentPage, maxStickers: 100 });
    }
  }, [albumId, currentPage, requestAlbumDetails]);

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
      }
    }
  }, [changedStickers, requestUpdateStickersQuantity]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (changedStickers.size === 0) {
        return;
      }

      e.preventDefault();

      cleanUpFunction().then(() => {
        navigation.dispatch(e.data.action);
      });
    });

    return unsubscribe;
  }, [navigation, changedStickers.size, cleanUpFunction]);

  console.log("changedStickers", changedStickers);

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
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primary100 }]}>
          {albumDetailsStore.data?.name || 'Album Screen V2'}
        </Text>
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
                  Enviando...
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
