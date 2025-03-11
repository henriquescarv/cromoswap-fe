import React from "react";
import { StyleSheet, Pressable, Text, ActivityIndicator } from "react-native";
import { ButtonProps } from "./Button.types";

export default function Button({text, children, widthFull, variant, loading, onClick}: ButtonProps) {
  return (
    <Pressable style={[styles.button, widthFull && styles.buttonFullWidth]} onTouchEnd={onClick}>
      {text && !loading && <Text style={styles.text}>{text}</Text>}
      {loading && <ActivityIndicator size="small" color="#fff" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3a70c2',
    borderRadius: 24,
    paddingHorizontal: 24,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  text: {
    color: '#fff',
    fontFamily: 'primaryMedium',
  },


  buttonFullWidth: {
    width: '100%',
    paddingHorizontal: 0,
  },
});