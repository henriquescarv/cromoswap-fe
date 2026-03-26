import { TabEnum } from '@/screens/UserProfile/UserProfile.types';
import { CityErrors, DefaultErrors, EmailErrors, PasswordErrors, StateErrors, UsernameErrors } from '@/validators/forms/forms.types';

const Locales = {
  login: {
    title: 'Welcome!',
    usernamePlaceholder: 'Username',
    passwordPlaceholder: 'Password',
    loginButton: 'Login',
    noAccountLabel: 'Don\'t have an account? ',
    registerButton: 'Sign up!',
  },
  register: {
    title: 'Sign up!',
    description: 'Create an account to continue',
    passwordStepTitle: 'Create a password',
    continueButton: 'Continue',
    registerButton: 'Sign up!',
    goBackButton: 'Back',
    termsText: 'By signing up, you agree to our ',
    termsLink: 'Terms of Use',
    termsAnd: ' and ',
    privacyLink: 'Privacy Policy',
    links: {
      terms: 'https://www.cromoswap.app/en/terms',
      privacy: 'https://www.cromoswap.app/en/privacy',
    },
    inputs: {
      nameTitle: 'Username',
      namePlaceholder: 'Enter your username',
      emailTitle: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordTitle: 'Password',
      passwordPlaceholder: 'Create a strong password',
      confirmPasswordPlaceholder: 'Repeat your password',
    },
    inputErrors: {
      password: {
        [DefaultErrors.EMPTY]: 'Required field',
        [PasswordErrors.NOT_MATCHING]: 'Passwords do not match',
        [PasswordErrors.MIN_LENGTH]: 'Password must be at least 8 characters',
      },
      username: {
        [DefaultErrors.EMPTY]: 'Required field',
        [UsernameErrors.MIN_LENGTH]: 'Username must be at least 3 characters',
        [UsernameErrors.ALREADY_EXISTS]: 'This username already exists',
        [UsernameErrors.INVALID]: 'Invalid username',
      },
      email: {
        [EmailErrors.INVALID]: 'Invalid email',
        [DefaultErrors.EMPTY]: 'Required field',
        [EmailErrors.ALREADY_EXISTS]: 'An account with this email already exists',
      },
    },

    locationStep: {
      title: 'We need your location',
      description: 'to find collectors near you and make your swaps easier :)',
      allowButton: 'Allow location',
      tryAgainButton: 'Try again',
      permissionDenied: 'Permission denied. Enable location in device settings.',
      openSettings: 'Open settings',
    }
  },
  home: {
    title: 'CromoSwap',
    seeMoreButtonLabel: 'See more',
    nearYou: {
      nearYouTitle: 'Nearby traders',
      seeProfile: 'View profile',
      trocables: 'TRADABLE',
      noPermissionText: 'To see nearby collectors, you need to ',
      noPermissionButton: 'allow location access',
      noPermissionButtonSettings: 'enable your location',
      inSettingsText: ' in settings.'
    },
    albums: {
      albumsTitle: 'Your albums',
      noAlbums: 'You don\'t have any albums yet! Click the button below to start collecting!',
      noNearUsers: 'No users nearby :(',
      totalStickers: quantity => `${quantity} stickers`,
    },
  },
  chooseAlbum: {
    albumsTitle: 'Available albums',
    seeMoreButtonLabel: 'See more',
    searchPlaceholder: 'Ex: “World Cup 2026”',
  },
  myAlbums: {
    albumsTitle: 'Your albums',
    externalUserAlbumsTitle: 'User\'s albums',
    seeMoreButtonLabel: 'See more',
    searchPlaceholder: 'Ex: “World Cup 2026”',
    noAlbums: 'You don\'t have any albums yet! Click the button below to start collecting!',
    noAlbumsExternalUser: 'This user doesn\'t have any albums yet!',
    deleteSheet: {
      title: 'Do you really want to delete this album?',
      warning: 'This action cannot be undone.',
      confirm: 'Yes, delete',
      cancel: 'Cancel',
      error: 'Could not delete the album. Try again.',
    },
  },
  purchaseAlbum: {
    stickersLabel: quantity => `${quantity} stickers`,
    collectAlbumButtonLabel: 'Collect album',
    goBackButtonLabel: 'Back',
  },
  nearYou: {
    title: 'Nearby traders',
    searchPlaceholder: 'Search for albums or users',
    seeProfile: 'View profile',
    message: 'Message',
    youHave: 'YOU HAVE',
    youNeed: 'YOU NEED',
  },
  album: {
    searchPlaceholder: 'Search sticker',
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
    stickersQty: quantity => `Showing ${quantity} stickers`,
  },
  userProfile: {
    editProfile: 'Edit profile',
    leave: 'Logout',
    yourAlbums: 'Your albums',
    seeMore: 'See more',
    albums: 'albums',
    followers: 'followers',
    following: 'following',
    follow: 'Follow',
    unfollow: 'Unfollow',
    sendMessage: 'Message',

    noAlbums: 'You don\'t have any albums yet! Click the button below to start collecting!',

    externalUser: {
      tabs: {
        [TabEnum.YOU_NEED]: qty => `You need (${qty})`,
        [TabEnum.YOU_HAVE]: qty => `You have (${qty})`,
      },
      showAlbum: 'View album',
    }
  },
  about: {
    title: 'About',
    support: 'Support',
    privacy: 'Privacy policy',
    terms: 'Terms of use',
    deleteAccount: 'Delete account',
    links: {
      support: 'https://www.cromoswap.app/en/support',
      privacy: 'https://www.cromoswap.app/en/privacy',
      terms: 'https://www.cromoswap.app/en/terms',
      deleteAccount: 'https://www.cromoswap.app/en/delete-account',
    }
  },
  notifications: {
    title: 'Notifications',
    newFollower: 'started following you!',
    time: {
      now: 'Now',
      minute: (time) => `${time}min`,
      hour: (time) => `${time}h`,
      day: (time) => `${time}d`,
    }
  },
  messages: {
    title: 'Messages',
    messageCard: {
      you: 'You: ',
    }
  },
  chat: {
    title: 'Messages',
    placeholder: 'Type your message...'
  },
  followListScreen: {
    followers: 'Followers',
    following: 'Following',
    follow: 'Follow',
    unfollow: 'Unfollow',
  },
  editProfile: {
    title: 'Edit Profile',
    usernameLabel: 'Username',
    emailLabel: 'Email',
    regionLabel: 'Location',
    passwordLabel: 'Password',
    changePasswordButton: 'Change password',
  },
  editRegion: {
    title: 'Change location',
    description: 'to find collectors near you and make your swaps easier :)',
    saveButton: 'Save',
  },
  pagination: {
    pageInfo: (current, total) => `Page ${current} of ${total}`,
    categoriesLabel: 'Categories:',
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
      minLength: 'At least 8 characters',
      uppercase: 'Uppercase letter (A-Z)',
      lowercase: 'Lowercase letter (a-z)',
      number: 'Number (0-9)',
      special: 'Special character (!@#$%...)',
    },
  }
};

export default Locales;
