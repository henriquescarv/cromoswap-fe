export type SelectProps<T> = {
  label?: string;
  searchPlaceholder?: string;
  emptySearchText?: string;
  selectedValue: T;
  onValueChange: (value: T) => void;
  placeholder?: string;
  errorMessage?: string;
  options: { label: string; value: T }[];
};