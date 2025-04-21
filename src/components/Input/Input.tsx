import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputProps } from "./Input.types";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";

export default function Input({title, placeholder, value, onChangeText, password, maxLength, errorMessage}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { theme } = useTheme();

  const inputBorderColor = errorMessage ? theme.primaryRed : theme.grey10;
  
  return (
    <View style={styles.inputContainer}>
      {title && <Text style={[styles.inputTitle, { color: theme.primary100 }]}>{title}</Text>}

      <TextInput
        style={[styles.input, { borderColor: inputBorderColor, color: theme.highDark }]}
        placeholder={placeholder}
        placeholderTextColor={theme.grey20}
        secureTextEntry={password && !isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
      />
      <View style={[styles.inputError]}>
        {errorMessage && <Text style={[styles.inputErrorText, { color: theme.primaryRed }]}>{errorMessage}</Text>}	
      </View>
      {password && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.inputIcon}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={32}
            color={theme.grey20}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 24,
  },
  input: {
    height: 48,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 16,
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
    right: 12,
    bottom: 8,
    zIndex: 1,
    borderRadius: 16,
    backgroundColor: 'transparent',
  }
});