import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { DefaultErrorsProps } from '@/validators/forms/forms.types';
import formsValidators from '@/validators/forms/forms';
import { STEPS, StepProps } from './RegisterScreen.types';
import { BasicInfosStep } from './components/BasicInfosStep';
import { PasswordStep } from './components/PasswordStep';
import { LocationStep } from './components/LocationStep';
import useStore from '@/services/store';

const defaultErrors: DefaultErrorsProps = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
};

const initialStep: StepProps = STEPS.BASIC_INFOS;

export default function RegisterScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inputErrors, setInputErrors] = useState({ ...defaultErrors });

  const { verifyUsername, verifyEmail, verifyPassword, comparePassowrd } = formsValidators;

  const {
    register: registerStore,
    login: loginStore,
    requestRegister,
  } = useStore((state: any) => state);

  const { theme } = useTheme();

  const basicInfosButtonIsDisabled = !username || !email;
  const passwordButtonIsDisabled = !password || password !== confirmPassword;

  const redirectToHome = useCallback(() => {
    if (registerStore.status === 'success' && !!loginStore.isAuthenticated) {
      navigation.navigate('Main');
    }
  }, [loginStore.isAuthenticated, registerStore.status, navigation]);

  useEffect(() => {
    redirectToHome();
  }, [redirectToHome]);

  const handleVerifyErrors = () => {
    const usernameError = verifyUsername(username);
    const emailError = verifyEmail(email);

    setInputErrors({
      ...inputErrors,
      username: usernameError,
      email: emailError,
    });

    return !!(usernameError || emailError);
  };

  const handleGoToPasswordStep = () => {
    setCurrentStep(STEPS.PASSWORD);
  };

  const handleGoToLocationStep = () => {
    setCurrentStep(STEPS.LOCATION);
  };

  const handleGoToBasicInfosStep = () => {
    setCurrentStep(STEPS.BASIC_INFOS);
  };

  const handleBackToLoginStep = () => {
    navigation.goBack();
  };

  const handleLocationGranted = (latitude: number, longitude: number) => {
    const hasSomeError = Object.values(inputErrors).some((error) => error !== null);
    if (hasSomeError) return;
    requestRegister({ username, email, password, latitude, longitude });
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
    handleContinue: handleGoToLocationStep,
    buttonIsDisabled: passwordButtonIsDisabled,
  };

  const locationStepProps = {
    handleGoBack: handleGoToPasswordStep,
    handleContinue: handleLocationGranted,
    buttonIsLoading: registerStore.loading,
  };

  const stepRules = {
    [STEPS.BASIC_INFOS]: <BasicInfosStep {...basicInfosStepProps} />,
    [STEPS.PASSWORD]: <PasswordStep {...passwordStepProps} />,
    [STEPS.LOCATION]: <LocationStep {...locationStepProps} />,
  };

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
});
