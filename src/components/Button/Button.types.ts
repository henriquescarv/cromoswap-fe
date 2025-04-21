import { ColorType } from "@/styles/themes/themes.types";

export type ButtonProps = {
  text?: string;
  children?: React.ReactNode;
  widthFull?: boolean;
  fontSize?: number;
  variant?: 'primary' | 'secondary' | 'text' | 'link';
  size?: 'small' | 'medium' | 'large';
  color?: ColorType;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onClickDisabled?: () => void;
}