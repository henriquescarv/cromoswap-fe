import React from "react";
import { StyleSheet, Pressable, Text, ActivityIndicator, TouchableHighlight } from "react-native";
import { ButtonProps } from "./Button.types";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";

export default function Button({text, children, disabled, widthFull, variant, loading, onClick}: ButtonProps) {
  const { theme } = useTheme();

  if (variant === 'text') {
    return (
      <TouchableHighlight onPress={onClick} disabled={disabled || loading}>
        <Text style={[styles.linkText, { color: theme.primary50 }]}>{text}</Text>
      </TouchableHighlight>
    )
  }

  return (
    <Pressable
      style={[styles.button, widthFull && styles.buttonFullWidth, { backgroundColor: theme.primary50 }]}
      onTouchEnd={onClick}
      disabled={disabled || loading}
    >
      {text && !loading && <Text style={[styles.text, { color: theme.defaultLight }]}>{text}</Text>}
      {loading && <ActivityIndicator size="small" color={theme.defaultLight} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingHorizontal: 24,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  linkText: {
    fontFamily: 'primaryMedium',
  },
  text: {
    fontFamily: 'primaryMedium',
    fontSize: 16,
  },
  buttonFullWidth: {
    width: '100%',
    paddingHorizontal: 0,
  },
});