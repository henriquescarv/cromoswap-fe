import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ChatInputProps } from "./ChatInput.types";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";

export default function ChatInput({ placeholder, value, onChangeText, maxLength, onSendMessage }: ChatInputProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { backgroundColor: theme.grey5, color: theme.highDark }]}
        placeholder={placeholder}
        placeholderTextColor={theme.grey20}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
      />
    
      <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.primary50 }]} onPress={onSendMessage}>
        <Ionicons
          name='send'
          size={24}
          color={theme.highLight}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  input: {
    height: 48,
    paddingLeft: 24,
    paddingRight: 48,
    borderRadius: 24,
    width: '100%',
    fontFamily: 'primaryRegular',
  },
  inputError: {
    position: 'absolute',
    bottom: -18,
  },
  inputErrorText: {
    fontFamily: 'primaryRegular',
    fontSize: 12,
  },
  inputTitle: {
    fontFamily: 'semiBold',
    fontSize: 12,
    marginBottom: 4,
  },
  sendButton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    margin: 4,
    height: 40,
    width: 40,
    zIndex: 1,
    borderRadius: '50%',
  }
});