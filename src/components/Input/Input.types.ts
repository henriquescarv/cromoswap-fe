export type InputProps = {
  title?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  type?: 'password';
  password?: boolean;
  maxLength?: number;
  errorMessage?: string | null;
}