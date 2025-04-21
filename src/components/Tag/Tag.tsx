import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TagTypes } from './Tag.types';

export default function Tag({ number, text, variant='primary' }: TagTypes) {
  const { theme } = useTheme();

  const backgroundColorRules = {
    primary: theme.primary50,
    secondary: theme.primary20,
    tertiary: theme.highLight,
  }

  const fontColorRules = {
    primary: theme.defaultLight,
    secondary: theme.primary50,
    tertiary: theme.primary50,
  }

  return (
    <View style={[styles.tag, { backgroundColor: backgroundColorRules[variant] }]}>
      <Text style={[styles.text, { color: fontColorRules[variant] }]}>{` ${number} ${text}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 20,
    borderRadius: 16,
    alignSelf: 'flex-start',
    paddingLeft: 4,
    paddingRight: 6,
  },
  text: {
    fontSize: 14,
    fontFamily: 'primaryBold',
    lineHeight: 20,
  },
});
