import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { createStickersArray, StickerType } from '@/data/stickersData';
import useStore from '@/services/store';
import { useRoute } from '@react-navigation/native';
import { Pagination } from '@/components/Pagination';
import StickerButton from '@/components/StickerButton';

// Tipo para sticker real da API
interface RealStickerType {
  id: number;
  order: number;
  number: string;
  category: string | null;
  quantity: number;
}

export default function AlbumScreenV2({ navigation }: any) {
  const [stickers, setStickers] = useState<RealStickerType[]>([]);
  const [originalStickers, setOriginalStickers] = useState<RealStickerType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [changedStickers, setChangedStickers] = useState<Map<number, number>>(new Map()); // Map<stickerId, newQuantity>
  const [screenData, setScreenData] = useState(Dimensions.get('window'));
  const [isSendingChanges, setIsSendingChanges] = useState(false);
  const { theme } = useTheme();
  const route = useRoute<any>();

  // Calcula dimensões dinâmicas
  const screenWidth = screenData.width;
  const minItemWidth = 70; // largura mínima desejada para cada item
  const horizontalPadding = 16; // 8px de cada lado do FlatList
  const itemMargin = 8; // 4px de cada lado do item (total 8px por item)
  const availableWidth = screenWidth - horizontalPadding;
  
  // Calcula número de colunas baseado na largura disponível
  const numColumns = Math.floor(availableWidth / (minItemWidth + itemMargin));
  const actualNumColumns = Math.max(3, Math.min(numColumns, 6)); // entre 3 e 6 colunas
  
  // Calcula largura fixa para cada item (descontando as margens)
  const itemWidth = (availableWidth - (itemMargin * actualNumColumns)) / actualNumColumns;
  const buttonHeight = 90; // Altura original aumentada (1.5x)
  const minusButtonHeight = 36; // Altura original do botão de menos (1.5x)
  const itemHeight = buttonHeight + minusButtonHeight + 2; // altura total do item
  const rowHeight = itemHeight + itemMargin;

  // Escuta mudanças de dimensões (rotação de tela, etc.)
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

  // Carrega os dados do álbum
  useEffect(() => {
    if (albumId) {
      requestAlbumDetails({ userAlbumId: albumId, page: currentPage, maxStickers: 100 });
    }
  }, [albumId, currentPage, requestAlbumDetails]);

  // Atualiza os stickers quando os dados chegam
  useEffect(() => {
    if (albumDetailsStore.data?.stickersList) {
      const stickersCopy = [...albumDetailsStore.data.stickersList];
      
      // Aplica mudanças locais aos novos dados
      stickersCopy.forEach(sticker => {
        if (changedStickers.has(sticker.id)) {
          sticker.quantity = changedStickers.get(sticker.id)!;
        }
      });
      
      setStickers(stickersCopy);
      
      // Sempre atualiza originalStickers com os dados frescos da API
      setOriginalStickers([...albumDetailsStore.data.stickersList]);
    }
  }, [albumDetailsStore.data?.stickersList]);

  // Aplica mudanças locais quando changedStickers muda
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

  // Função para identificar e enviar mudanças quando sair da tela
  const cleanUpFunction = useCallback(async () => {
    console.log('cleanUpFunction called with changes:', changedStickers.size);
    
    if (changedStickers.size === 0) {
      return; // Nenhuma mudança para enviar
    }

    const stickersToUpdate: { id: number; quantity: number }[] = [];

    // Converte o Map de mudanças para o formato esperado pela API
    changedStickers.forEach((quantity, id) => {
      stickersToUpdate.push({ id, quantity });
    });

    console.log('Sending stickers to API:', stickersToUpdate);

    // Envia para a API
    if (stickersToUpdate.length > 0) {
      await requestUpdateStickersQuantity({ stickersToUpdate });
      console.log('API call completed successfully');
    }

    setChangedStickers(new Map()); // Limpa as mudanças locais
  }, [changedStickers, requestUpdateStickersQuantity]);

  // Hook para detectar quando o usuário está saindo da tela
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (changedStickers.size === 0) {
        return; // Nenhuma mudança para enviar, permite a navegação
      }

      // Previne a navegação padrão
      e.preventDefault();

      // Executa a função de limpeza e depois permite a navegação
      cleanUpFunction().then(() => {
        navigation.dispatch(e.data.action);
      });
    });

    return unsubscribe;
  }, [navigation, changedStickers.size, cleanUpFunction]);

  const incrementQuantity = useCallback((id: number) => {
    console.log('incrementQuantity called for id:', id, 'current changes:', changedStickers.size);
    
    setStickers(prevStickers =>
      prevStickers.map(sticker =>
        sticker.id === id
          ? { ...sticker, quantity: sticker.quantity + 1 }
          : sticker
      )
    );

    // Atualiza o Map de mudanças
    setChangedStickers(prev => {
      const newMap = new Map(prev);
      const currentSticker = stickers.find(s => s.id === id);
      if (currentSticker) {
        newMap.set(id, currentSticker.quantity + 1);
        console.log('New changes map size:', newMap.size);
      }
      return newMap;
    });
  }, [stickers]);

  const decrementQuantity = useCallback((id: number) => {
    console.log('decrementQuantity called for id:', id, 'current changes:', changedStickers.size);
    
    setStickers(prevStickers =>
      prevStickers.map(sticker =>
        sticker.id === id && sticker.quantity > 0
          ? { ...sticker, quantity: sticker.quantity - 1 }
          : sticker
      )
    );

    // Atualiza o Map de mudanças
    setChangedStickers(prev => {
      const newMap = new Map(prev);
      const currentSticker = stickers.find(s => s.id === id);
      if (currentSticker && currentSticker.quantity > 0) {
        newMap.set(id, currentSticker.quantity - 1);
        console.log('New changes map size:', newMap.size);
      }
      return newMap;
    });
  }, [stickers]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Função de teste para enviar mudanças manualmente
  const testSendChanges = useCallback(async () => {
    if (isSendingChanges) return; // Evita cliques múltiplos
    
    console.log('Test button pressed - sending changes manually');
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

  // Loading state
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
        key={`${screenData.width}-${screenData.height}`} // Force re-render on screen change
        data={stickers}
        renderItem={renderStickerButton}
        keyExtractor={(item) => item.id.toString()}
        numColumns={actualNumColumns}
        contentContainerStyle={[
          styles.gridContainer,
          { paddingBottom: changedStickers.size > 0 ? 120 : 16 } // Espaço extra quando o botão está visível
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
      
      {/* Botão fixo na parte inferior */}
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
  testButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  testButtonText: {
    fontSize: 14,
    fontFamily: 'primaryMedium',
    textAlign: 'center',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 34, // Espaço extra para safe area
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
