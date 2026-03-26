import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { Ionicons } from '@expo/vector-icons';

interface CategorySelectFilterProps {
  categories: string[];
  selectedCategories: string[];
  onConfirm: (categories: string[]) => void;
  placeholder?: string;
  confirmLabel?: string;
}

const SHEET_MAX_HEIGHT = Dimensions.get('window').height * 0.48;

export default function CategorySelectFilter({
  categories,
  selectedCategories,
  onConfirm,
  placeholder = 'Categoria',
  confirmLabel = 'Confirmar',
}: CategorySelectFilterProps) {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<string[]>([]);
  const slideAnim = useRef(new Animated.Value(SHEET_MAX_HEIGHT)).current;

  const openSheet = () => {
    setPendingSelection([...selectedCategories]);
    setVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 0,
      speed: 20,
    }).start();
  };

  const closeSheet = (confirm = false) => {
    Animated.timing(slideAnim, {
      toValue: SHEET_MAX_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      if (confirm) {
        onConfirm(pendingSelection);
      }
    });
  };

  // Keep slideAnim reset when visibility changes
  useEffect(() => {
    if (!visible) {
      slideAnim.setValue(SHEET_MAX_HEIGHT);
    }
  }, [visible]);

  const toggleCategory = (cat: string) => {
    setPendingSelection(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const displayText =
    selectedCategories.length > 0 ? selectedCategories.join(', ') : null;

  const renderItem = ({ item }: { item: string }) => {
    const isSelected = pendingSelection.includes(item);
    return (
      <TouchableOpacity
        style={[styles.option, { borderBottomColor: theme.grey5 }]}
        onPress={() => toggleCategory(item)}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.optionText, { color: isSelected ? theme.primary50 : theme.primary100 }]}
          numberOfLines={1}
        >
          {item}
        </Text>
        <View
          style={[
            styles.checkbox,
            {
              borderColor: isSelected ? theme.primary50 : theme.grey20,
              backgroundColor: isSelected ? theme.primary20 : 'transparent',
            },
          ]}
        >
          {isSelected && (
            <Ionicons name="checkmark" size={14} color={theme.primary50} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* Trigger button — styled like the Search input */}
      <TouchableOpacity
        style={[styles.trigger, { backgroundColor: theme.grey5 }]}
        onPress={openSheet}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.triggerText,
            { color: displayText ? theme.highDark : theme.grey20 },
          ]}
          numberOfLines={1}
        >
          {displayText ?? placeholder}
        </Text>
        <Ionicons
          name="chevron-down-outline"
          size={20}
          color={theme.primary50}
          style={styles.chevron}
        />
      </TouchableOpacity>

      {/* Bottom sheet modal */}
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={() => closeSheet(false)}
        statusBarTranslucent
      >
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={() => closeSheet(false)}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            { backgroundColor: theme.highLight, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Handle */}
          <View style={styles.handleRow}>
            <View style={[styles.handle, { backgroundColor: theme.grey15 }]} />
          </View>

          {/* Category list */}
          <FlatList
            data={categories}
            keyExtractor={item => item}
            renderItem={renderItem}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />

          {/* Confirm button */}
          <View style={[styles.footer, { borderTopColor: theme.grey5 }]}>
            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: theme.primary50 }]}
              onPress={() => closeSheet(true)}
              activeOpacity={0.8}
            >
              <Text style={[styles.confirmText, { color: theme.highLight }]}>
                {confirmLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    height: 40,
    borderRadius: 24,
    paddingLeft: 24,
    paddingRight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  triggerText: {
    flex: 1,
    fontFamily: 'primaryRegular',
    fontSize: 14,
  },
  chevron: {
    position: 'absolute',
    right: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: SHEET_MAX_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 4,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  list: {
    flexGrow: 0,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  optionText: {
    flex: 1,
    fontFamily: 'primaryRegular',
    fontSize: 15,
    marginRight: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  confirmButton: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    fontFamily: 'primaryMedium',
    fontSize: 16,
  },
});
