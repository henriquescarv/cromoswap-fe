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
    locationStep: {
      title: 'We need your location',
      description: 'to find collectors near you and make trading easier :)',
      allowButton: 'Allow location',
      tryAgainButton: 'Try again',
      permissionDenied: 'Permission denied. Enable location in your device settings.',
      openSettings: 'Open settings',
    },
  },
  home: {
    title: 'CromoSwap',
    seeMoreButtonLabel: 'See more',
    nearYou: {
      nearYouTitle: 'Near you',
      seeProfile: 'See profile',
      trocables: 'TRADEABLE',
      noPermissionText: 'To see nearby collectors, you need to ',
      noPermissionButton: 'allow location access',
      noPermissionButtonSettings: 'enable location',
      inSettingsText: " in settings."
    },
    albums: {
      albumsTitle: 'Your albums',
      noAlbums: "You don't have any albums yet! Click the button below to start collecting!",
      noNearUsers: 'No nearby users :(',
      totalStickers: (quantity: number) => `${quantity} stickers`,
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
  album: {
    searchPlaceholder: 'E.g.: "Portugal, Cristiano, 200"',
    categoryPlaceholder: 'Category',
    categoryConfirm: 'Confirm',
    filterChips: {
      iHave: 'I have',
      iMissing: 'Missing',
      myRepeated: 'Repeated',
      userHave: 'Has',
      userMissing: 'Missing',
      userRepeated: 'Repeated',
      youNeed: 'YOU NEED',
      youHave: 'YOU HAVE',
    },
    clearFilters: 'Clear filters',
    stickersQty: (quantity: number) => `Showing ${quantity} stickers`,
  },
  myAlbums: {
    albumsTitle: 'Your albums',
    externalUserAlbumsTitle: 'User albums',
    seeMoreButtonLabel: 'See more',
    searchPlaceholder: 'E.g.: "World Cup 2026"',
    noAlbums: "You don't have any albums yet! Click the button below to start collecting!",
    noAlbumsExternalUser: 'This user has no albums yet!',
    deleteSheet: {
      title: 'Delete album?',
      warning: 'This action cannot be undone.',
      confirm: 'Yes, delete',
      cancel: 'Cancel',
      error: 'Could not delete the album. Please try again.',
    },
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
