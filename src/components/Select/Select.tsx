import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { SelectProps } from "./Select.types";
import { useTheme } from "@/providers/ThemeModeProvider/ThemeModeProvider";
import { Ionicons } from "@expo/vector-icons";
import Input from "../Input/Input";

const Select = <T extends string>({
  label,
  searchPlaceholder = "",
  emptySearchText = "Nenhum resultado encontrado :(",
  placeholder,
  selectedValue,
  onValueChange,
  errorMessage,
  options,
}: SelectProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchInput.toLowerCase())
    || option.label
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .includes(
        searchInput
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      )
  );

  const { theme } = useTheme();
  const inputBorderColor = errorMessage ? theme.primaryRed : theme.grey10;

  const handleSelect = (value: T) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.selectButton, { borderColor: inputBorderColor }]}
        onPress={() => setModalVisible(true)}
      >
        {selectedValue && (
          <Text style={[styles.selectButtonText, { color: theme.highDark }]}>
            {options.find((option) => option.value === selectedValue)?.label}
          </Text>
        )}
        {!selectedValue && <Text style={[styles.placeholderText, { color: theme.grey20 }]}>{placeholder}</Text>}
        <Ionicons name={"chevron-down-outline"} size={24} color={theme.primary100} />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.highLight }]}>
          <View style={[styles.headContainer]}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons
                name={"chevron-back-outline"}
                size={24}
                color={theme.primary50}
              />
            </TouchableOpacity>
            <Text style={[styles.modalTitleText, { color: theme.primary100 }]}>{placeholder}</Text>
          </View>
          <View style={[styles.searchContainer]}>
            <Input
              placeholder={searchPlaceholder}
              value={searchInput}
              onChangeText={setSearchInput}
              maxLength={255}
            />
          </View>
          <View style={styles.modalContent}>
            {!!filteredOptions.length && (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.option, { borderColor: theme.grey10 }]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text style={[styles.optionText, { color: theme.highDark }]}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            {!filteredOptions.length && (
              <View style={[styles.emptyState]}>
                <Ionicons name={"thumbs-down-outline"} size={48} color={theme.grey20} />
                <Text style={[styles.optionText, { color: theme.grey20 }]}>{emptySearchText}</Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#ffffff",
  },
  selectButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 16,
    width: '100%',
    fontFamily: 'primaryRegular',
    justifyContent: 'space-between',
  },
  selectButtonText: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
  },
  placeholderText: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
  },
  modalContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  headContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    gap: 16,
    paddingTop: 16,
    paddingBottom: 48,
    alignItems: "center",
  },
  searchContainer: {
    width: "90%",
    paddingBottom: 24,
  },
  modalTitleText: {
    fontSize: 20,
    fontFamily: 'primaryMedium',
  },
  modalContent: {
    width: "100%",
    height: "80%",
    paddingBottom: 24,
  },
  option: {
    padding: 12,
    paddingLeft: 32,
    borderTopWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'primaryRegular',
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Select;
