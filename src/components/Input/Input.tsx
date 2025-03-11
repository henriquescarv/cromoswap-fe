import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { InputProps } from "./Input.types";

export default function Input({placeholder, value, onChangeText, password}: InputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={password}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '100%',
    fontFamily: 'primaryRegular',
  },
});