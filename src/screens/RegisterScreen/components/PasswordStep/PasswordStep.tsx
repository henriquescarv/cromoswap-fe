import React, { useContext, useMemo, useState } from 'react';
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { LocaleContext } from "@/providers/LocaleProvider/LocaleProvider";
import { useTheme } from '@/providers/ThemeModeProvider/ThemeModeProvider';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PasswordStepProps } from "./PasswordStep.types";
import { Ionicons } from '@expo/vector-icons';

type PasswordRequirement = {
  label: string;
  met: boolean;
};

const PasswordStep = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleGoBack,
  handleContinue,
  buttonIsDisabled,
  buttonIsLoading = false,
  title,
  continueButtonText,
}: PasswordStepProps) => {
  const { theme } = useTheme();
  const { locale } = useContext(LocaleContext);
  const { register: registerLocale, editField: editFieldLocale } = locale;
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false);

  const defaultTitle = title || registerLocale.passwordStepTitle;
  const defaultButtonText = continueButtonText || registerLocale.continueButton;

  const passwordRequirements: PasswordRequirement[] = useMemo(() => [
    {
      label: editFieldLocale.passwordRequirements.minLength,
      met: password.length >= 8,
    },
    {
      label: editFieldLocale.passwordRequirements.uppercase,
      met: /[A-Z]/.test(password),
    },
    {
      label: editFieldLocale.passwordRequirements.lowercase,
      met: /[a-z]/.test(password),
    },
    {
      label: editFieldLocale.passwordRequirements.number,
      met: /[0-9]/.test(password),
    },
    {
      label: editFieldLocale.passwordRequirements.special,
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ], [password, editFieldLocale]);

  const allRequirementsMet = passwordRequirements.every(req => req.met);

  const handleConfirmPasswordBlur = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setShowPasswordMismatch(true);
    } else {
      setShowPasswordMismatch(false);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setShowPasswordMismatch(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            name={"chevron-back-outline"}
            size={32}
            color={theme.primary50}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.primary100 }]}>
          {defaultTitle}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.primary100 }]}>
            {editFieldLocale.passwordLabel}
          </Text>
          <Input
            placeholder={editFieldLocale.placeholder}
            value={password}
            onChangeText={setPassword}
            password
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.primary100 }]}>
            {editFieldLocale.confirmPasswordLabel}
          </Text>
          <Input
            placeholder={editFieldLocale.confirmPasswordPlaceholder}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            password
            errorMessage={showPasswordMismatch ? registerLocale.inputErrors.password.NOT_MATCHING : null}
          />
        </View>

        <View style={styles.requirementsContainer}>
          {passwordRequirements.map((requirement, index) => (
            <View key={index} style={styles.requirementRow}>
              <Ionicons
                name={requirement.met ? "checkmark-circle" : "close-circle"}
                size={16}
                color={requirement.met ? theme.success : theme.grey15}
              />
              <Text style={[
                styles.requirementText,
                {
                  color: requirement.met ? theme.success : theme.grey15,
                }
              ]}>
                {requirement.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            text={defaultButtonText}
            onClick={handleContinue}
            loading={buttonIsLoading}
            widthFull
            disabled={buttonIsDisabled || !allRequirementsMet}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    gap: 32,
  },
  headContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'primaryBold',
  },
  formContainer: {
    width: '100%',
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'primaryRegular',
  },
  buttonContainer: {
    marginTop: 8,
  },
  requirementsContainer: {
    marginTop: 12,
    marginBottom: 20,
    gap: 8,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 12,
    fontFamily: 'primaryRegular',
  },
});

export default PasswordStep;
