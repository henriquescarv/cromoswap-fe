import React, { useContext, useState } from 'react';
import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider"
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { useToast } from '@/providers/ToastProvider';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native"
import { BasicInfosStepProps } from "./BasicInfosStep.types";
import { Ionicons } from '@expo/vector-icons';
import { checkUserExists } from '@/services/api/api';
import { UsernameErrors, EmailErrors } from '@/validators/forms/forms.types';

const BasicInfosStep = ({
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
}: BasicInfosStepProps) => {
  const { theme } = useTheme();
  const { showToast } = useToast();
  const { locale } = useContext(LocaleContext);
  const { register: registerLocale } = locale;

  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const handleCheckUsername = async () => {
    if (!username || username.length < 3) return;

    setCheckingUsername(true);
    try {
      const response = await checkUserExists('USERNAME', username);
      setUsernameExists(response.data.exists);
      if (response.data.exists) {
        setInputErrors(prev => ({ ...prev, username: UsernameErrors.ALREADY_EXISTS }));
      }
    } catch (error) {
      console.error('Error checking username:', error);
      showToast('warning', 'Erro ao verificar nome de usuário. Tente novamente.');
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleCheckEmail = async () => {
    if (!email || !email.includes('@')) return;

    setCheckingEmail(true);
    try {
      const response = await checkUserExists('EMAIL', email);
      setEmailExists(response.data.exists);
      if (response.data.exists) {
        setInputErrors(prev => ({ ...prev, email: EmailErrors.ALREADY_EXISTS }));
      }
    } catch (error) {
      console.error('Error checking email:', error);
      showToast('warning', 'Erro ao verificar e-mail. Tente novamente.');
    } finally {
      setCheckingEmail(false);
    }
  };

  const onChangeUsername = (username: string) => {
    setUsername(username);
    setInputErrors(prev => ({ ...prev, username: null }));
    setUsernameExists(false);
  }
  const onChangeEmail = (email: string) => {
    setEmail(email);
    setInputErrors(prev => ({ ...prev, email: null }));
    setEmailExists(false);
  }

  const handleContinue = async () => {
    const hasFormatErrors = handleVerifyErrors();
    if (hasFormatErrors) {
      return;
    }

    if (username && username.length >= 3) {
      setCheckingUsername(true);
      try {
        const response = await checkUserExists('USERNAME', username);
        if (response.data.exists) {
          setUsernameExists(true);
          setInputErrors(prev => ({ ...prev, username: UsernameErrors.ALREADY_EXISTS }));
          setCheckingUsername(false);
          return;
        }
      } catch (error) {
        console.error('Error checking username:', error);
        showToast('warning', 'Erro ao verificar nome de usuário. Tente novamente.');
        setCheckingUsername(false);
        return;
      }
      setCheckingUsername(false);
    }

    if (email && email.includes('@')) {
      setCheckingEmail(true);
      try {
        const response = await checkUserExists('EMAIL', email);
        if (response.data.exists) {
          setEmailExists(true);
          setInputErrors(prev => ({ ...prev, email: EmailErrors.ALREADY_EXISTS }));
          setCheckingEmail(false);
          return;
        }
      } catch (error) {
        console.error('Error checking email:', error);
        showToast('warning', 'Erro ao verificar e-mail. Tente novamente.');
        setCheckingEmail(false);
        return;
      }
      setCheckingEmail(false);
    }

    handleGoToPasswordStep();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => handleBackToLoginStep()}>
          <Ionicons
            name={"chevron-back-outline"}
            size={32}
            color={theme.primary50}
          />
        </TouchableOpacity>

        <View style={styles.headTextContainer}>
          <Text style={[styles.title, { color: theme.primary100 }]}>{registerLocale.title}</Text>
          <Text style={[styles.description, { color: theme.grey20 }]}>{registerLocale.description}</Text>
        </View>
      </View>
      <View style={[styles.inputsContainer]}>
        <Input
          title={registerLocale.inputs.nameTitle}
          placeholder={registerLocale.inputs.namePlaceholder}
          value={username}
          onChangeText={onChangeUsername}
          onBlur={handleCheckUsername}
          maxLength={32}
          errorMessage={inputErrors.username ? locale.register.inputErrors.username[inputErrors.username] : null}
        />
        <Input
          title={registerLocale.inputs.emailTitle}
          placeholder={registerLocale.inputs.emailPlaceholder}
          value={email}
          maxLength={128}
          onChangeText={onChangeEmail}
          onBlur={handleCheckEmail}
          errorMessage={inputErrors.email ? locale.register.inputErrors.email[inputErrors.email] : null}
        />
      </View>
      <View style={styles.termsContainer}>
        <Text style={[styles.termsText, { color: theme.grey20 }]}>
          {registerLocale.termsText}
          <Text
            style={[styles.termsLink, { color: theme.primary50 }]}
            onPress={() => Linking.openURL(registerLocale.links.terms)}
          >
            {registerLocale.termsLink}
          </Text>
          {registerLocale.termsAnd}
          <Text
            style={[styles.termsLink, { color: theme.primary50 }]}
            onPress={() => Linking.openURL(registerLocale.links.privacy)}
          >
            {registerLocale.privacyLink}
          </Text>
        </Text>
      </View>
      <View style={[styles.buttonsContainer]}>
        <Button
          onClick={handleContinue}
          onClickDisabled={handleVerifyErrors}
          text={registerLocale.continueButton}
          widthFull
          disabled={basicInfosButtonIsDisabled || usernameExists || emailExists || checkingUsername || checkingEmail}
          loading={checkingUsername || checkingEmail}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'semiBold',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'primaryRegular',
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
  inputsContainer: {
    width: '90%',
    marginTop: 68,
    marginBottom: 32,
  },
  termsContainer: {
    width: '90%',
    marginBottom: 32,
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'primaryRegular',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    fontSize: 12,
    fontFamily: 'semiBold',
  },
  buttonsContainer: {
    width: '90%',
    gap: 16,
  }
});

export default BasicInfosStep;
