export type InputProps = {
  title?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  password?: boolean;
}