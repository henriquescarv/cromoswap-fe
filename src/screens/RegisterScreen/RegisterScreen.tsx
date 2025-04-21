import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { CityErrors, DefaultErrorsProps, DefaultRegionErrorsProps, StateErrors } from '@/validators/forms/forms.types';
import formsValidators from '@/validators/forms/forms';
import { STEPS, StepProps } from './RegisterScreen.types';
import { BasicInfosStep } from './components/BasicInfosStep';
import { RegionStep } from './components/RegionStep';
import useStore from '@/services/store';

const defaultErrors: DefaultErrorsProps = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
};

const defaultRegionErrors: DefaultRegionErrorsProps = {
  countryState: null,
  city: null,
};

const initialStep: StepProps = STEPS.BASIC_INFOS;

export default function RegisterScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryState, setCountryState] = useState('');
  const [city, setCity] = useState('');
  const [inputErrors, setInputErrors] = useState({ ...defaultErrors });
  const [regionErrors, setRegionErrors] = useState({ ...defaultRegionErrors });

  const { verifyUsername, verifyEmail, verifyPassword, comparePassowrd } = formsValidators;

  const {
    register: registerStore,
    login: loginStore,
    requestRegister,
    requestIbgeStates,
    requestIbgeCities,
  } = useStore((state: any) => state);

  const statesList = registerStore.ibge.countryStates.list;
  const citiesList = registerStore.ibge.cities.list;

  const { theme } = useTheme();

  const basicInfosButtonIsDisabled = !username || !email || !password || password !== confirmPassword;
  const regionButtonIsDisabled = !countryState || !city;

  const redirectToHome = useCallback(() => {
    if (registerStore.status === 'success' && !!loginStore.isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [loginStore.isAuthenticated, registerStore.status, navigation]);

  useEffect(() => {
    redirectToHome();
  }, [redirectToHome]);

  const getDefaultData = useCallback(() => {
    requestIbgeStates();

    if (countryState) {
      requestIbgeCities(countryState);
    }
  }, [countryState]);

  useEffect(() => {
    getDefaultData();
  }, [getDefaultData]);

  const handleVerifyErrors = () => {
    const usernameError = verifyUsername(username);
    const emailError = verifyEmail(email);
    const passwordError = verifyPassword(password);
    const confirmPasswordError = comparePassowrd(password, confirmPassword);

    setInputErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
  }

  const handleVerifyRegionErrors = () => {
    const countryStateError = countryState ? null : StateErrors.EMPTY;
    const cityError = city ? null : CityErrors.EMPTY;

    setRegionErrors({
      countryState: countryStateError,
      city: cityError,
    });
  }

  const handleGoToRegionStep = () => {
    setCurrentStep(STEPS.REGION);
  }

  const handleGoToBasicInfosStep = () => {
    setCurrentStep(STEPS.BASIC_INFOS);
  }

  const handleBackToLoginStep = () => {
    navigation.goBack();
  }

  const handleRegister = () => {
    requestRegister({ username, email, password, countryState, city });
  }

  const handleClickRegister = () => {
    const hasSomeError = Object.values(inputErrors).some((error) => error !== null);

    if (hasSomeError) {
      return;
    }

    handleRegister();
  };

  const basicInfosStepProps = {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    inputErrors,
    setInputErrors,
    handleVerifyErrors,
    handleGoToRegionStep,
    handleBackToLoginStep,
    basicInfosButtonIsDisabled,
  };

  const regionStepProps = {
    city,
    setCity,
    countryState,
    setCountryState,
    citiesList,
    statesList,
    handleVerifyRegionErrors,
    handleGoToBasicInfosStep,
    handleClickRegister,
    regionButtonIsDisabled,
    buttonIsLoading: registerStore.loading,
    regionErrors,
    setRegionErrors,
  };

  const stepRules = {
    [STEPS.BASIC_INFOS]: <BasicInfosStep {...basicInfosStepProps} />,
    [STEPS.REGION]: <RegionStep {...regionStepProps} />,
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.wrapper, { backgroundColor: theme.highLight }]}>
        {stepRules[currentStep]}
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
  container: {
    width: '90%',
    alignItems: 'center',
  },
});
