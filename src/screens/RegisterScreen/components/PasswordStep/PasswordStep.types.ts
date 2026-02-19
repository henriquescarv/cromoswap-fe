export type PasswordStepProps = {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  handleGoBack: () => void;
  handleContinue: () => void;
  buttonIsDisabled: boolean;
  buttonIsLoading?: boolean;
  title?: string;
  continueButtonText?: string;
};
