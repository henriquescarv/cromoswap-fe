import React, { useContext } from 'react';
import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider"
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native"
import { BasicInfosStepProps } from "./BasicInfosStep.types";
import { Ionicons } from '@expo/vector-icons';

const BasicInfosStep = ({
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
}: BasicInfosStepProps) => {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { register: registerLocale } = locale;

  const onChangeUsername = (username: string) => {
    setUsername(username);
    setInputErrors({ ...inputErrors, username: null });
  }
  const onChangeEmail = (email: string) => {
    setEmail(email);
    setInputErrors({ ...inputErrors, email: null });
  }
  const onChangePassword = (password: string) => {
    setPassword(password);
    setInputErrors({ ...inputErrors, password: null });
  }
  const onChangeConfirmPassword = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    setInputErrors({ ...inputErrors, confirmPassword: null });
  }

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
          maxLength={32}
          errorMessage={inputErrors.username ? locale.register.inputErrors.username[inputErrors.username] : null}
        />
        <Input
          title={registerLocale.inputs.emailTitle}
          placeholder={registerLocale.inputs.emailPlaceholder}
          value={email}
          maxLength={128}
          onChangeText={onChangeEmail}
          errorMessage={inputErrors.email ? locale.register.inputErrors.email[inputErrors.email] : null}
        />
        <Input
          title={registerLocale.inputs.passwordTitle}
          placeholder={registerLocale.inputs.passwordPlaceholder}
          password
          value={password}
          maxLength={72}
          onChangeText={onChangePassword}
          errorMessage={inputErrors.password ? locale.register.inputErrors.password[inputErrors.password] : null}
        />
        <Input
          placeholder={registerLocale.inputs.confirmPasswordPlaceholder}
          password
          value={confirmPassword}
          maxLength={72}
          onChangeText={onChangeConfirmPassword}
          errorMessage={inputErrors.confirmPassword ? locale.register.inputErrors.password[inputErrors.confirmPassword] : null}
        />
      </View>
      <View style={styles.termsContainer}>
        <Text style={[styles.termsText, { color: theme.grey20 }]}>
          {registerLocale.termsText}
          <Text
            style={[styles.termsLink, { color: theme.primary50 }]}
            onPress={() => Linking.openURL('https://www.cromoswap.app/pt-br/termos')}
          >
            {registerLocale.termsLink}
          </Text>
          {registerLocale.termsAnd}
          <Text
            style={[styles.termsLink, { color: theme.primary50 }]}
            onPress={() => Linking.openURL('https://www.cromoswap.app/pt-br/privacidade')}
          >
            {registerLocale.privacyLink}
          </Text>
        </Text>
      </View>
      <View style={[styles.buttonsContainer]}>
        <Button
          onClick={handleGoToRegionStep}
          onClickDisabled={handleVerifyErrors}
          text={registerLocale.continueButton}
          widthFull
          disabled={basicInfosButtonIsDisabled}
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
