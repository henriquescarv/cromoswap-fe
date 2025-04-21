export enum DefaultErrors {
  EMPTY = 'EMPTY',
  MIN_LENGTH = 'MIN_LENGTH',
  INVALID = 'INVALID',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
}

export enum UsernameErrors {
  EMPTY = 'EMPTY',
  MIN_LENGTH = 'MIN_LENGTH',
  INVALID = 'INVALID',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
};

export enum EmailErrors {
  EMPTY = 'EMPTY',
  INVALID = 'INVALID',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
};

export enum PasswordErrors {
  EMPTY = 'EMPTY',
  MIN_LENGTH = 'MIN_LENGTH',
  NOT_MATCHING = 'NOT_MATCHING',
};

export type DefaultErrorsProps = {
  username: UsernameErrors | null;
  email: EmailErrors | null;
  password: PasswordErrors | null;
  confirmPassword: PasswordErrors | null;
};

export enum StateErrors {
  EMPTY = 'EMPTY',
};

export enum CityErrors {
  EMPTY = 'EMPTY',
};

export type DefaultRegionErrorsProps = {
  countryState: StateErrors | null;
  city: CityErrors | null;
};
