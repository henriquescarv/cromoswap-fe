import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SearchProps } from "./Search.types";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";

export default function Search({ title, placeholder, disabled, value, onChangeText, onSearch, maxLength, errorMessage }: SearchProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { theme } = useTheme();

  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <View style={styles.inputContainer}>
      {title && <Text style={[styles.inputTitle, { color: theme.primary100 }]}>{title}</Text>}

      <TextInput
        style={[styles.input, { backgroundColor: theme.grey5, color: theme.highDark, paddingRight: onSearch ? 48 : 24 }]}
        placeholder={placeholder}
        placeholderTextColor={theme.grey20}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        editable={!disabled}
        returnKeyType={onSearch ? "search" : "default"}
        onSubmitEditing={handleSearch}
      />

      <View style={[styles.inputError]}>
        {errorMessage && <Text style={[styles.inputErrorText, { color: theme.primaryRed }]}>{errorMessage}</Text>}
      </View>

      {onSearch && (
        <TouchableOpacity style={styles.inputIconRight} onPress={handleSearch} disabled={disabled}>
          <Ionicons
            name='search'
            size={24}
            color={disabled ? theme.grey15 : theme.primary50}
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
  },
  input: {
    height: 40,
    paddingLeft: 24,
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
  inputIconRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 48,
    zIndex: 1,
  }
});