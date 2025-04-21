import React from "react";
import { TabProps } from "./Tab.types";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";

export default function Tab({ label, selected = false, onPress }: TabProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.chip, { borderColor: selected ? theme.primary50 : 'transparent' }]}>
        <Text style={[styles.label, { color: theme.primary100 }]}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  chip: {
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'primaryMedium',
    marginBottom: 4,
  },
})