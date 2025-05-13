export type ChatInputProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  maxLength?: number;
  onSendMessage?: (content) => void;
  onFocus?: () => void;
}