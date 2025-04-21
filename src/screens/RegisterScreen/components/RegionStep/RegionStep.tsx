import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RegionStepProps } from './RegionStep.types';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import Button from '@/components/Button/Button';
import Select from '@/components/Select/Select';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { Ionicons } from '@expo/vector-icons';

const RegionStep = ({
  city,
  setCity,
  countryState,
  setCountryState,
  citiesList = [],
  statesList = [],
  handleClickRegister,
  handleGoToBasicInfosStep,
  handleVerifyRegionErrors,
  regionButtonIsDisabled = false,
  buttonIsLoading,
  regionErrors,
  setRegionErrors,
}: RegionStepProps) => {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { register: registerLocale } = locale;

  const stateOptions = statesList.map((state: { id: string, name: string }) => ({
    label: state.name,
    value: state.id,
  }));

  const cityOptions = citiesList.map((state: { id: string, name: string }) => ({
    label: state.name,
    value: state.name,
  }));

  const onChangeCountryState = (countryState: string) => {
    setCountryState(countryState);
    setRegionErrors({ ...regionErrors, countryState: null });
    setCity('');
  }

  const onChangeCity = (city: string) => {
    setCity(city);
    setRegionErrors({ ...regionErrors, city: null });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => handleGoToBasicInfosStep()}>
          <Ionicons
            name={"chevron-back-outline"}
            size={26}
            color={theme.primary50}
          />
        </TouchableOpacity>
        <View style={styles.headTextContainer}>
          <Text style={[styles.title, { color: theme.primary100 }]}>{registerLocale.regionStep.title}</Text>
          <Text style={[styles.description, { color: theme.grey20 }]}>{registerLocale.regionStep.description}</Text>
        </View>
      </View>
      <View style={[styles.inputsContainer]}>
        <Select
          placeholder={registerLocale.regionStep.countryStatePlaceholder}
          searchPlaceholder={registerLocale.regionStep.searchStatePlaceholder}
          options={stateOptions}
          selectedValue={countryState}
          onValueChange={(itemValue) => onChangeCountryState(itemValue)}
        />
        {countryState && (
          <Select
            placeholder={registerLocale.regionStep.cityPlaceholder}
            searchPlaceholder={registerLocale.regionStep.searchCityPlaceholder}
            options={cityOptions}
            selectedValue={city}
            onValueChange={(itemValue) => onChangeCity(itemValue)}
          />
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          onClick={handleClickRegister}
          onClickDisabled={handleVerifyRegionErrors}
          text={registerLocale.registerButton}
          widthFull
          loading={buttonIsLoading}
          disabled={regionButtonIsDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 200,
    paddingTop: 140,
  },
  headContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  headTextContainer: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'semiBold',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'primaryRegular',
    width: '80%',
  },
  inputsContainer: {
    width: '90%',
    marginTop: 80,
    marginBottom: 140,
  },
  buttonsContainer: {
    width: '90%',
    gap: 16,
  }
});

export default RegionStep;
