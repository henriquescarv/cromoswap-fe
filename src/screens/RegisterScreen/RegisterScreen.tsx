import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { CityErrors, DefaultErrorsProps, DefaultRegionErrorsProps, StateErrors } from '@/validators/forms/forms.types';
import formsValidators from '@/validators/forms/forms';
import { STEPS, StepProps } from './RegisterScreen.types';
import { BasicInfosStep } from './components/BasicInfosStep';
import { PasswordStep } from './components/PasswordStep';
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

  const basicInfosButtonIsDisabled = !username || !email;
  const passwordButtonIsDisabled = !password || password !== confirmPassword;
  const regionButtonIsDisabled = !countryState || !city;

  const redirectToHome = useCallback(() => {
    if (registerStore.status === 'success' && !!loginStore.isAuthenticated) {
      navigation.navigate('Main');
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

    setInputErrors({
      ...inputErrors,
      username: usernameError,
      email: emailError,
    });

    // Retorna true se houver algum erro
    return !!(usernameError || emailError);
  }

  const handleVerifyPasswordErrors = () => {
    const passwordError = verifyPassword(password);
    const confirmPasswordError = comparePassowrd(password, confirmPassword);

    setInputErrors({
      ...inputErrors,
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

  const handleGoToPasswordStep = () => {
    setCurrentStep(STEPS.PASSWORD);
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
    inputErrors,
    setInputErrors,
    handleVerifyErrors,
    handleGoToPasswordStep,
    handleBackToLoginStep,
    basicInfosButtonIsDisabled,
  };

  const passwordStepProps = {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleGoBack: handleGoToBasicInfosStep,
    handleContinue: handleGoToRegionStep,
    buttonIsDisabled: passwordButtonIsDisabled,
  };

  const regionStepProps = {
    city,
    setCity,
    countryState,
    setCountryState,
    citiesList,
    statesList,
    handleVerifyRegionErrors,
    handleGoToBasicInfosStep: handleGoToPasswordStep,
    handleClickRegister,
    regionButtonIsDisabled,
    buttonIsLoading: registerStore.loading,
    regionErrors,
    setRegionErrors,
  };

  const stepRules = {
    [STEPS.BASIC_INFOS]: <BasicInfosStep {...basicInfosStepProps} />,
    [STEPS.PASSWORD]: <PasswordStep {...passwordStepProps} />,
    [STEPS.REGION]: <RegionStep {...regionStepProps} />,
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.wrapper, { backgroundColor: theme.highLight }]} edges={['top', 'left', 'right']}>
        {stepRules[currentStep]}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  container: {
    width: '90%',
    alignItems: 'center',
  },
});
