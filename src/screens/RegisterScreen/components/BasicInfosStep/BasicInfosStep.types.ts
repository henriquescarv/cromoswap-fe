import { DefaultErrorsProps } from "@/validators/forms/forms.types";

export type BasicInfosStepProps = {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  inputErrors: DefaultErrorsProps;
  setInputErrors: (errors: DefaultErrorsProps) => void;
  handleClickRegister: () => void;
  buttonIsDisabled: boolean;
};