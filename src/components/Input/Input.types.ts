import { TextInputProps } from "react-native";

export type InputProps = {
  title?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  type?: 'password';
  password?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  maxLength?: number;
  errorMessage?: string | null;
}