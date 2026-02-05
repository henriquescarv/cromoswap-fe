import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';

export default function AboutScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { about: aboutLocale } = locale;

  const goBack = () => {
    navigation.goBack();
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const menuItems = [
    {
      label: aboutLocale.support,
      url: aboutLocale.links.support,
    },
    {
      label: aboutLocale.privacy,
      url: aboutLocale.links.privacy,
    },
    {
      label: aboutLocale.terms,
      url: aboutLocale.links.terms,
    },
    {
      label: aboutLocale.deleteAccount,
      url: aboutLocale.links.deleteAccount,
    },
  ];

  return (
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

            <Text style={[styles.blockTitle, { color: theme.primary100 }]}>{aboutLocale.title}</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { borderBottomColor: theme.grey5 }]}
              onPress={() => openLink(item.url)}
            >
              <Text style={[styles.menuItemText, { color: theme.primary100 }]}>
                {item.label}
              </Text>
              <Ionicons
                name={"chevron-forward-outline"}
                size={24}
                color={theme.grey20}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
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
  menuContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'primaryMedium',
  },
});
