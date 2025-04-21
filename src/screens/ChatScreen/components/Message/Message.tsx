import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MessageProps } from "./Message.types";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";

export default function Message({ message, sender, date }: MessageProps) {
  const { theme } = useTheme();

  return (
    <View
      style={
        [styles.wrapper, {
          backgroundColor: sender === 'me' ? theme.primary20 : theme.grey10,
          borderBottomRightRadius: sender === 'me' ? 0 : 8,
          borderBottomLeftRadius: sender === 'me' ? 8 : 0,
        }]
      }
    >
      <Text style={[styles.messageText, { color: theme.primary100 }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    padding: 12,
    paddingVertical: 8,
    width: '80%',
    marginVertical: 8,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'primaryRegular',
  },
});
