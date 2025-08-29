import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { createStickersArray, StickerType } from '@/data/stickersData';
import useStore from '@/services/store';
import { useRoute } from '@react-navigation/native';

// Tipo para sticker real da API
interface RealStickerType {
  id: number;
  order: number;
  number: string;
  category: string | null;
  quantity: number;
}

// Componente otimizado do botão sticker
const StickerButton = React.memo(({ 
  item, 
  onPlusPress, 
  onMinusPress,
  theme 
}: { 
  item: RealStickerType; 
  onPlusPress: (id: number) => void; 
  onMinusPress: (id: number) => void;
  theme: any;
}) => (
  <View style={[styles.stickerContainer]}>
    <TouchableOpacity
      style={[styles.stickerButton, { backgroundColor: theme.primary50 }]}
      onPress={() => onPlusPress(item.id)}
    >
      <Text style={[styles.quantityText, { color: theme.highLight }]}>
        {item.quantity}
      </Text>
      <Text style={[styles.numberText, { color: theme.highLight }]}>
        {item.number}
      </Text>
    </TouchableOpacity>
    
    {item.quantity > 0 && (
      <TouchableOpacity
        style={[styles.minusButton, { backgroundColor: theme.grey20 }]}
        onPress={() => onMinusPress(item.id)}
      >
        <Text style={[styles.minusButtonText, { color: theme.highLight }]}>
          -
        </Text>
      </TouchableOpacity>
    )}
  </View>
));

export default function AlbumScreenV2({ navigation }: any) {
  const [stickers, setStickers] = useState<RealStickerType[]>([]);
  const [originalStickers, setOriginalStickers] = useState<RealStickerType[]>([]);
  const { theme } = useTheme();
  const route = useRoute<any>();

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
      requestAlbumDetails({ userAlbumId: albumId });
    }
  }, [albumId, requestAlbumDetails]);

  // Atualiza os stickers quando os dados chegam
  useEffect(() => {
    if (albumDetailsStore.data?.stickersList) {
      const stickersCopy = [...albumDetailsStore.data.stickersList];
      setStickers(stickersCopy);
      setOriginalStickers([...albumDetailsStore.data.stickersList]); // Salva uma cópia dos dados originais
    }
  }, [albumDetailsStore.data?.stickersList]);

  // Função para identificar e enviar mudanças quando sair da tela
  const cleanUpFunction = useCallback(async () => {
    const stickersToUpdate: { id: number; quantity: number }[] = [];

    // Compara o estado atual com o original para identificar mudanças
    stickers.forEach(currentSticker => {
      const originalSticker = originalStickers.find(orig => orig.id === currentSticker.id);
      
      if (originalSticker && currentSticker.quantity !== originalSticker.quantity) {
        stickersToUpdate.push({
          id: currentSticker.id,
          quantity: currentSticker.quantity
        });
      }
    });

    // Se houver mudanças, envia para a API
    if (stickersToUpdate.length > 0) {
      console.log('Enviando atualizações:', stickersToUpdate);
      await requestUpdateStickersQuantity({ stickersToUpdate });
    }

    resetAlbumDetails();
  }, [stickers, originalStickers, requestUpdateStickersQuantity, resetAlbumDetails]);

  // Chama cleanup quando o componente for desmontado
  useEffect(() => {
    return () => {
      cleanUpFunction();
    };
  }, [cleanUpFunction]);

  const incrementQuantity = useCallback((id: number) => {
    setStickers(prevStickers =>
      prevStickers.map(sticker =>
        sticker.id === id
          ? { ...sticker, quantity: sticker.quantity + 1 }
          : sticker
      )
    );
  }, []);

  const decrementQuantity = useCallback((id: number) => {
    setStickers(prevStickers =>
      prevStickers.map(sticker =>
        sticker.id === id && sticker.quantity > 0
          ? { ...sticker, quantity: sticker.quantity - 1 }
          : sticker
      )
    );
  }, []);

  const renderStickerButton = useCallback(({ item }: { item: RealStickerType }) => (
    <StickerButton 
      item={item} 
      onPlusPress={incrementQuantity} 
      onMinusPress={decrementQuantity}
      theme={theme}
    />
  ), [incrementQuantity, decrementQuantity, theme]);

  // Loading state
  // if (!albumDetailsStore.loading || !albumDetailsStore.data) {
  //   return (
  //     <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
  //       <View style={[styles.loadingWrapper]}>
  //         <ActivityIndicator
  //           size="large"
  //           color={theme.primary50}
  //         />
  //         <Text style={[styles.loadingText, { color: theme.primary100 }]}>
  //           Carregando stickers...
  //         </Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primary100 }]}>
          {albumDetailsStore.data?.name || 'Album Screen V2'}
        </Text>
      </View>
      
      <FlatList
        data={stickers}
        renderItem={renderStickerButton}
        keyExtractor={(item) => item.id.toString()}
        numColumns={5}
        contentContainerStyle={styles.gridContainer}
        style={styles.flatList}
        removeClippedSubviews={true}
        maxToRenderPerBatch={25}
        windowSize={5}
        initialNumToRender={25}
        updateCellsBatchingPeriod={30}
        getItemLayout={(data, index) => ({
          length: 94, // altura do item + margin (60 + 24 + 2 + 8 margin)
          offset: 94 * Math.floor(index / 5),
          index,
        })}
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
  },
  stickerContainer: {
    flex: 1,
    margin: 4,
    alignItems: 'center',
    minWidth: 50,
    maxWidth: 60,
  },
  stickerButton: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusButton: {
    width: '100%',
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  minusButtonText: {
    fontSize: 16,
    fontFamily: 'primaryBold',
  },
  quantityText: {
    fontSize: 12,
    fontFamily: 'primaryBold',
    position: 'absolute',
    top: 4,
  },
  numberText: {
    fontSize: 16,
    fontFamily: 'primaryMedium',
  },
});
