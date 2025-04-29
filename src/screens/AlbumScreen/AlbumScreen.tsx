import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Search from '@/components/Search/Search';
import { useRoute } from '@react-navigation/native';
import { StickerItem } from '../../components/StickerItem';
import { ChipsTypes, StickersListProps } from './AlbumScreen.types';
import { Chip } from './components/Chip';
import Button from '@/components/Button/Button';
import useStore from '@/services/store';

export default function AlbumScreen({ navigation }: any) {
  const [filter, setFilter] = useState('');
  const [selectedChip, setSelectedChip] = useState(null);
  const [filteredList, setFilteredList] = useState<StickersListProps>([]);
  const [displayFilter, setDisplayFilter] = useState(true);

  const {
    albumDetails: albumDetailsStore,
    summary: summaryStore,
    requestAlbumDetails,
  } = useStore((state: any) => state);

  const stickersQuantity = filteredList.reduce((acc, category) => {
    return acc + category.length;
  }, 0);

  const route = useRoute();
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { album: albumLocale } = locale;

  const { albumId, userId: userIdByParam } = route.params;

  const getDefaultData = useCallback(() => {
    requestAlbumDetails({ userAlbumId: albumId });
  }, []);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const userId = userIdByParam || summaryStore?.data?.id;

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
  
    return Object.values(grouped);
  }, []);

  const stickersListByCategory = useMemo(() => {
    return groupStickersByCategory(albumDetailsStore.data?.stickersList);
  }, [albumDetailsStore.data?.stickersListByCategory, groupStickersByCategory]);

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
  //     [
  //       { id: 11, order: 1, number: '001', category: 'ARG', quantity: 0, youHave: true, youNeed: false },
  //       { id: 12, order: 2, number: '002', category: 'ARG', quantity: 1, youHave: true, youNeed: true },
  //       { id: 13, order: 3, number: '003', category: 'ARG', quantity: 2, youHave: true, youNeed: true },
  //       { id: 14, order: 4, number: '004', category: 'ARG', quantity: 0, youHave: true, youNeed: true },
  //       { id: 15, order: 5, number: '005', category: 'ARG', quantity: 0, youHave: false, youNeed: false },
  //       { id: 16, order: 6, number: '006', category: 'ARG', quantity: 0, youHave: false, youNeed: false },
  //       { id: 17, order: 7, number: '007', category: 'ARG', quantity: 0, youHave: false, youNeed: false },
  //       { id: 18, order: 8, number: '008', category: 'ARG', quantity: 0, youHave: true, youNeed: false },
  //     ],
  //     [
  //       { id: 21, order: 1, number: '001', category: 'BOL', quantity: 0, youHave: true, youNeed: true },
  //       { id: 22, order: 2, number: '002', category: 'BOL', quantity: 1, youHave: true, youNeed: true },
  //       { id: 23, order: 3, number: '003', category: 'BOL', quantity: 2, youHave: true, youNeed: true },
  //       { id: 24, order: 4, number: '004', category: 'BOL', quantity: 0, youHave: true, youNeed: false },
  //       { id: 25, order: 5, number: '005', category: 'BOL', quantity: 0, youHave: true, youNeed: false },
  //       { id: 26, order: 6, number: '006', category: 'BOL', quantity: 0, youHave: false, youNeed: false },
  //       { id: 27, order: 7, number: '007', category: 'BOL', quantity: 0, youHave: false, youNeed: false },
  //       { id: 28, order: 8, number: '008', category: 'BOL', quantity: 0, youHave: false, youNeed: false },
  //     ],
  //   ],
  // }), []);

  const isExternalUserAlbum = userId !== albumDetailsStore.data?.userId;

  const mountChipsList = useCallback(() => {
    const list = [
      { id: ChipsTypes.HAVE, label: albumLocale.filterChips.have, value: ChipsTypes.HAVE },
      { id: ChipsTypes.MISSING, label: albumLocale.filterChips.missing, value: ChipsTypes.MISSING },
      { id: ChipsTypes.REPEATED, label: albumLocale.filterChips.repeated, value: ChipsTypes.REPEATED },
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
          {filteredList.map((list) => !!list.length && (
            <View key={list[0]?.category} style={[styles.categoryListContainer]}>
              {!!list[0]?.category && <Text>{list[0]?.category}</Text>}

              <View style={[styles.stickersContainer]}>
                {list.map((item) => (
                  <StickerItem
                    key={item.id}
                    number={item.number}
                    quantity={item.quantity}
                    myAlbum={!isExternalUserAlbum}
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