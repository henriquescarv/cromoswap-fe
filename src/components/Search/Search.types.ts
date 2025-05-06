export type SearchProps = {
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'password';
  maxLength?: number;
  errorMessage?: string | null;
}