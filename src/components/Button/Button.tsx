import React from "react";
import { StyleSheet, Pressable, Text, ActivityIndicator, TouchableHighlight } from "react-native";
import { ButtonProps } from "./Button.types";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";

export default function Button({
  text,
  children,
  disabled = false,
  fontSize = 16,
  widthFull = false,
  variant = 'primary',
  loading = false,
  size = 'medium',
  color = 'primary50',
  onClick,
  onClickDisabled
}: ButtonProps) {
  const { theme } = useTheme();

  const handleClick = disabled ? onClickDisabled : onClick;

  if (variant === 'text') {
    const buttonTextColor = disabled ? theme.grey20 : theme[color];

    return (
      <TouchableHighlight onPress={handleClick} disabled={disabled || loading}>
        <Text style={[styles.linkText, { color: buttonTextColor, fontSize }]}>{text}</Text>
      </TouchableHighlight>
    )
  }

  const backgroundColorRules = {
    primary: disabled ? theme.grey20 : theme[color],
    secondary: 'transparent',
    link: theme[color],
  }

  const borderColorRules = {
    primary: 'transparent',
    secondary: disabled ? theme.grey20 : theme[color],
    link: 'transparent',
  }

  const textColorRules = {
    primary: theme.defaultLight,
    secondary: theme[color],
    link: theme[color],
  }

  const minHeightRules = {
    small: 32,
    medium: 48,
    large: 48,
  }

  const buttonBackgroundColor = variant ? backgroundColorRules[variant] : theme[color];
  const buttonBorderColor = variant ? borderColorRules[variant] : theme[color];
  const buttonTextColor = variant ? textColorRules[variant] : theme.defaultLight;
  const minHeightSize = variant ? minHeightRules[size] : 48;

  return (
    <Pressable
      style={[
        styles.button,
        widthFull && styles.buttonFullWidth,
        {
          backgroundColor: buttonBackgroundColor,
          borderColor: buttonBorderColor,
          minHeight: minHeightSize,
        },
        disabled && { opacity: 0.5 }
      ]}
      onTouchEnd={handleClick}
      disabled={disabled || loading}
    >
      {text && !loading && <Text style={[styles.text, { color: buttonTextColor, fontSize }]}>{text}</Text>}
      {loading && <ActivityIndicator size="small" color={buttonTextColor} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderWidth: 2,
    paddingHorizontal: 24,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  linkText: {
    fontFamily: 'semiBold',
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