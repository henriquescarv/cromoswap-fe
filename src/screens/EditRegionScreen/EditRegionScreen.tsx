import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { useToast } from '@/providers/ToastProvider';
import { DefaultRegionErrorsProps } from '@/validators/forms/forms.types';
import useStore from '@/services/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RegionStep from '../RegisterScreen/components/RegionStep/RegionStep';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';

const defaultRegionErrors: DefaultRegionErrorsProps = {
  countryState: null,
  city: null,
};

export default function EditRegionScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { locale } = useContext(LocaleContext);

  const [countryState, setCountryState] = useState('');
  const [city, setCity] = useState('');
  const [regionErrors, setRegionErrors] = useState({ ...defaultRegionErrors });
  const [loading, setLoading] = useState(false);

  const {
    summary: summaryStore,
    register: registerStore,
    requestSummary,
    requestChangeUserData,
    requestIbgeStates,
    requestIbgeCities,
  } = useStore((state: any) => state);

  const statesList = registerStore.ibge.countryStates.list;
  const citiesList = registerStore.ibge.cities.list;

  const regionButtonIsDisabled = !countryState || !city;

  useEffect(() => {
    if (summaryStore.data) {
      setCountryState(summaryStore.data.countryState || '');
      setCity(summaryStore.data.city || '');
    }
  }, [summaryStore.data]);

  const getDefaultData = useCallback(() => {
    requestIbgeStates();

    if (countryState) {
      requestIbgeCities(countryState);
    }
  }, [countryState]);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const goBack = () => {
    navigation.goBack();
  };

  const handleSaveRegion = async () => {
    setLoading(true);
    try {
      await requestChangeUserData({
        dataToChange: 'countryState',
        oldValue: summaryStore.data.countryState,
        newValue: countryState,
      });

      await requestChangeUserData({
        dataToChange: 'city',
        oldValue: summaryStore.data.city,
        newValue: city,
      });

      await requestSummary();
      showToast('success', 'Região atualizada com sucesso!');
      goBack();
    } catch (error) {
      console.error('Error updating region:', error);
      showToast('warning', 'Erro ao atualizar região. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const regionStepProps = {
    city,
    setCity,
    countryState,
    setCountryState,
    citiesList,
    statesList,
    handleGoToBasicInfosStep: goBack,
    handleClickRegister: handleSaveRegion,
    regionButtonIsDisabled,
    buttonIsLoading: loading,
    regionErrors,
    setRegionErrors,
    customTitle: locale.editRegion?.title,
    customDescription: "",
    customButtonText: locale.editRegion?.saveButton,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.wrapper, { backgroundColor: theme.highLight, paddingTop: insets.top }]}>
        <RegionStep {...regionStepProps} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
    width: '100%',
  },
});
