import React from 'react';

const Locales = {
  register: {
    title: 'Sign Up!',
    description: 'Create an account to continue',
    passwordStepTitle: 'Create a password',
    continueButton: 'Continue',
    registerButton: 'Sign Up!',
    goBackButton: 'Go Back',
    termsText: 'By signing up, you agree to our ',
    termsLink: 'Terms of Use',
    termsAnd: ' and ',
    privacyLink: 'Privacy Policy',
    links: {
      terms: 'https://www.cromoswap.app/en/termos',
      privacy: 'https://www.cromoswap.app/en/privacidade',
    },
  },
  about: {
    title: 'About',
    support: 'Support',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    deleteAccount: 'Delete Account',
    links: {
      support: 'https://www.cromoswap.app/en/suporte',
      privacy: 'https://www.cromoswap.app/en/privacidade',
      terms: 'https://www.cromoswap.app/en/termos',
      deleteAccount: 'https://www.cromoswap.app/en/deletar-conta',
    }
  },
  editField: {
    passwordLabel: 'Password',
    placeholder: 'Enter new password',
    newPasswordLabel: 'New password',
    confirmPasswordLabel: 'Confirm new password',
    confirmPasswordPlaceholder: 'Repeat new password',
    saveButton: 'Save',
    passwordMismatch: 'Passwords do not match',
    selectStatePlaceholder: 'Select your state',
    selectCityPlaceholder: 'Select your city',
    passwordRequirements: {
      minLength: 'Minimum 8 characters',
      uppercase: 'Uppercase letter (A-Z)',
      lowercase: 'Lowercase letter (a-z)',
      number: 'Number (0-9)',
      special: 'Special character (!@#$%...)',
    },
  }
};

export default Locales;
