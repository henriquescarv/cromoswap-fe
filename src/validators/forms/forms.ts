import { EmailErrors, PasswordErrors, UsernameErrors } from "./forms.types";

const verifyUsername = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9._]+$/;
  const usernameIsValid =  usernameRegex.test(username);

  let usernameError = null;

  if (!usernameIsValid) { usernameError = UsernameErrors.INVALID; }
  if (username.length < 3) { usernameError = UsernameErrors.MIN_LENGTH; }
  if (username.length === 0) { usernameError = UsernameErrors.EMPTY; }

  return usernameError;
}

const verifyEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailIsValid = emailRegex.test(email);

  let emailError = null;

  if (!emailIsValid) { emailError = EmailErrors.INVALID; }
  if (email.length === 0) { emailError = EmailErrors.EMPTY; }

  return emailError;
}

const verifyPassword = (password: string) => {
  let passwordError = null;

  if (password.length < 8) { passwordError = PasswordErrors.MIN_LENGTH; }
  if (password.length === 0) { passwordError = PasswordErrors.EMPTY; }

  return passwordError;
}

const comparePassowrd = (password: string, confirmPassword: string) => {
  let passwordError = null;

  if (password !== confirmPassword) { passwordError = PasswordErrors.NOT_MATCHING; }

  return passwordError;
}

const formsValidators = {
  verifyUsername,
  verifyEmail,
  verifyPassword,
  comparePassowrd,
}

export default formsValidators;
