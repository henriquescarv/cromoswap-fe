import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import axios from 'axios';
import { urlApi } from '@/fakeenv';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { DefaultErrorsProps } from '@/validators/forms/forms.types';
import formsValidators from '@/validators/forms/forms';
import { STEPS, StepProps } from './RegisterScreen.types';
import { BasicInfosStep } from './components/BasicInfosStep';

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

  const { theme } = useTheme();

  const buttonIsDisabled = password !== confirmPassword;

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

  const requestRegisterUser = async () => {
    try {
      const response = await axios.post(`${urlApi}/register`,
        {
          username,
          password,
        }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.data;
      if (response.status === 201) {
        Alert.alert('Register successful', data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Register failed', data.message);
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const handleClickRegister = async () => {
    handleVerifyErrors();
    const hasSomeError = Object.values(inputErrors).some((error) => error !== null);

    if (hasSomeError) { return; }

    await requestRegisterUser();
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
    handleClickRegister,
    buttonIsDisabled,
  };

  const stepRules = {
    [STEPS.BASIC_INFOS]: <BasicInfosStep {...basicInfosStepProps} />,
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
