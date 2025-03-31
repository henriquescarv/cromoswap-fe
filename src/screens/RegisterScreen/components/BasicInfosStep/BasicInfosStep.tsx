import React, { useContext } from 'react';
import Button from "@/components/Button/Button"
import Input from "@/components/Input/Input"
import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider"
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import formsValidators from "@/validators/forms/forms"
import { StyleSheet, Text, View } from "react-native"
import { BasicInfosStepProps } from "./BasicInfosStep.types";

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
  handleClickRegister,
  buttonIsDisabled,
}: BasicInfosStepProps) => {
  const { verifyUsername, verifyEmail, verifyPassword, comparePassowrd } = formsValidators;

  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { register: registerLocale } = locale;

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
        <Text style={[styles.title, { color: theme.primary100 }]}>{registerLocale.title}</Text>
        <Text style={[styles.description, { color: theme.grey20 }]}>{registerLocale.description}</Text>
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
      <Button onClick={handleClickRegister} text={registerLocale.registerButton} widthFull disabled={buttonIsDisabled} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
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
  },
  inputsContainer: {
    width: '100%',
    marginTop: 68,
    marginBottom: 68,
  }
});

export default BasicInfosStep;
