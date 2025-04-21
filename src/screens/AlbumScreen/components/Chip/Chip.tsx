import React from "react";
import { ChipProps } from "./Chip.types";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";

export default function Chip({ label, selected = false, onPress }: ChipProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.chip, { backgroundColor: selected ? theme.primary20 : 'transparent', borderColor: theme.primary20 }]}>
        <Text style={[styles.label, { color: theme.primary100 }]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 102,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'primaryMedium',
  },
})