export type ButtonProps = {
  text?: string;
  children?: React.ReactNode;
  widthFull?: boolean;
  variant?: 'primary' | 'secondary' | 'text';
  loading?: boolean;
  onClick?: () => void;
}