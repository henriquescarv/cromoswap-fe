export type ButtonProps = {
  text?: string;
  children?: React.ReactNode;
  widthFull?: boolean;
  variant?: 'primary' | 'secondary' | 'text' | 'link';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}