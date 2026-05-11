import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/Button/Button';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';

interface ErrorStateProps {
  title: string;
  description?: string;
  onRetry: () => void;
  retryLabel: string;
  style?: object;
}

export default function ErrorState({ title, description, onRetry, retryLabel, style }: ErrorStateProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="cloud-offline-outline" size={72} color={theme.primary50} />
      <Text style={[styles.title, { color: theme.primary100 }]}>{title}</Text>
      {!!description && (
        <Text style={[styles.description, { color: theme.grey20 }]}>{description}</Text>
      )}
      <Button text={retryLabel} onClick={onRetry} variant="secondary" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 32,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'primaryRegular',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    textAlign: 'center',
    lineHeight: 20,
  },
});
