import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { DefaultErrorsProps } from '@/validators/forms/forms.types';
import formsValidators from '@/validators/forms/forms';
import { STEPS, StepProps } from './RegisterScreen.types';
import { BasicInfosStep } from './components/BasicInfosStep';
import { PasswordStep } from './components/PasswordStep';
import { LocationStep } from './components/LocationStep';
import useStore from '@/services/store';
import { useToast } from '@/providers/ToastProvider';
import { useContext } from 'react';
import { LocaleContext } from '@/providers/LocaleProvider/LocaleProvider';
import { sendOTP, verifyOTP } from '@/services/api/api';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { Ionicons } from '@expo/vector-icons';

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
  const [otpValue, setOtpValue] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState('');

  const { verifyUsername, verifyEmail, verifyPassword, comparePassowrd } = formsValidators;

  const {
    register: registerStore,
    login: loginStore,
    requestRegister,
  } = useStore((state: any) => state);

  const { theme } = useTheme();
  const { showToast } = useToast();
  const { locale } = useContext(LocaleContext);
  const { register: registerLocale } = locale;
  const registerClickedRef = useRef(false);

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

  useEffect(() => {
    if (registerStore.status === 'error' && registerClickedRef.current) {
      registerClickedRef.current = false;
      showToast('warning', registerLocale.error);
    }
  }, [registerStore.status]);

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

  const handleGoToOtpStep = async () => {
    setOtpLoading(true);
    try {
      await sendOTP(email, 'register');
      setOtpValue('');
      setCurrentStep(STEPS.OTP);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao enviar código';
      showToast('warning', message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otpValue.length !== 6) return;
    setOtpLoading(true);
    try {
      const response = await verifyOTP(email, otpValue, 'register');
      setVerifiedToken(response.data.verifiedToken);
      setCurrentStep(STEPS.PASSWORD);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Código inválido';
      showToast('warning', message);
      setOtpValue('');
    } finally {
      setOtpLoading(false);
    }
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
    registerClickedRef.current = true;
    requestRegister({ username, email, password, verifiedToken, latitude, longitude });
  };

  const handleSkipLocation = () => {
    registerClickedRef.current = true;
    requestRegister({ username, email, password, verifiedToken });
  };

  const basicInfosStepProps = {
    username,
    setUsername,
    email,
    setEmail,
    inputErrors,
    setInputErrors,
    handleVerifyErrors,
    handleGoToPasswordStep: handleGoToOtpStep,
    handleBackToLoginStep,
    basicInfosButtonIsDisabled,
  };

  const passwordStepProps = {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleGoBack: () => setCurrentStep(STEPS.OTP),
    handleContinue: handleGoToLocationStep,
    buttonIsDisabled: passwordButtonIsDisabled,
  };

  const locationStepProps = {
    handleGoBack: handleGoToPasswordStep,
    handleContinue: handleLocationGranted,
    handleSkip: handleSkipLocation,
    buttonIsLoading: registerStore.loading,
  };

  const renderOtpStep = () => (
    <View style={styles.otpContainer}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => setCurrentStep(STEPS.BASIC_INFOS)}>
          <Ionicons name="chevron-back-outline" size={32} color={theme.primary50} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.otpTitle, { color: theme.primary100 }]}>Verificação de e-mail</Text>
      <Text style={[styles.otpSubtitle, { color: theme.primary50 }]}>
        Enviamos um código de 6 dígitos para {email}.
      </Text>
      <Input
        placeholder="000000"
        value={otpValue}
        onChangeText={(v) => setOtpValue(v.replace(/\D/g, '').slice(0, 6))}
        keyboardType="numeric"
        maxLength={6}
      />
      <Button
        text="Verificar"
        onClick={handleVerifyOtp}
        loading={otpLoading}
        disabled={otpValue.length !== 6}
        widthFull
      />
      <TouchableOpacity onPress={handleGoToOtpStep} style={styles.resendButton}>
        <Text style={[styles.resendText, { color: theme.primary50 }]}>Reenviar código</Text>
      </TouchableOpacity>
    </View>
  );

  const stepRules: Record<StepProps, React.ReactNode> = {
    [STEPS.BASIC_INFOS]: <BasicInfosStep {...basicInfosStepProps} />,
    [STEPS.OTP]: renderOtpStep(),
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
  otpContainer: {
    flex: 1,
    width: '100%',
    padding: 24,
    gap: 16,
  },
  headContainer: {
    width: '100%',
    marginBottom: 8,
  },
  otpTitle: {
    fontSize: 22,
    fontFamily: 'primaryBold',
  },
  otpSubtitle: {
    fontSize: 15,
    fontFamily: 'primaryRegular',
    marginBottom: 8,
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 8,
  },
  resendText: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
    textDecorationLine: 'underline',
  },
});
