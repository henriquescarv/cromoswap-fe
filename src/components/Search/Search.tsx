import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SearchProps } from "./Search.types";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";

export default function Search({title, placeholder, value, onChangeText, maxLength, errorMessage}: SearchProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { theme } = useTheme();

  return (
    <View style={styles.inputContainer}>
      {title && <Text style={[styles.inputTitle, { color: theme.primary100 }]}>{title}</Text>}

      <TextInput
        style={[styles.input, { backgroundColor: theme.grey5, color: theme.highDark }]}
        placeholder={placeholder}
        placeholderTextColor={theme.grey20}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
      />
    
      <View style={[styles.inputError]}>
        {errorMessage && <Text style={[styles.inputErrorText, { color: theme.primaryRed }]}>{errorMessage}</Text>}	
      </View>

      <View style={styles.inputIcon}>
        <Ionicons
          name='search'
          size={24}
          color={theme.highDark}
        />
      </View>
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
    paddingLeft: 48,
    paddingRight: 24,
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
  inputIcon: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    zIndex: 1,
    borderRadius: '50%',
  }
});