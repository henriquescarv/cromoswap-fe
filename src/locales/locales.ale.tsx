import { TabEnum } from '@/screens/UserProfile/UserProfile.types';
import { CityErrors, DefaultErrors, EmailErrors, PasswordErrors, StateErrors, UsernameErrors } from '@/validators/forms/forms.types';

const Locales = {
  login: {
    title: 'Willkommen!',
    usernamePlaceholder: 'Benutzername',
    passwordPlaceholder: 'Passwort',
    loginButton: 'Anmelden',
    noAccountLabel: 'Noch kein Konto? ',
    registerButton: 'Registrieren!',
  },
  register: {
    title: 'Registrieren!',
    description: 'Erstelle ein Konto, um fortzufahren',
    passwordStepTitle: 'Passwort erstellen',
    continueButton: 'Weiter',
    registerButton: 'Registrieren!',
    goBackButton: 'Zurück',
    termsText: 'Mit der Registrierung akzeptierst du unsere ',
    termsLink: 'Nutzungsbedingungen',
    termsAnd: ' und ',
    privacyLink: 'Datenschutzrichtlinie',
    links: {
      terms: 'https://www.cromoswap.app/de/nutzungsbedingungen',
      privacy: 'https://www.cromoswap.app/de/datenschutz',
    },
    inputs: {
      nameTitle: 'Benutzername',
      namePlaceholder: 'Gib deinen Benutzernamen ein',
      emailTitle: 'E-Mail',
      emailPlaceholder: 'Gib deine E-Mail ein',
      passwordTitle: 'Passwort',
      passwordPlaceholder: 'Erstelle ein sicheres Passwort',
      confirmPasswordPlaceholder: 'Passwort wiederholen',
    },
    inputErrors: {
      password: {
        [DefaultErrors.EMPTY]: 'Pflichtfeld',
        [PasswordErrors.NOT_MATCHING]: 'Passwörter stimmen nicht überein',
        [PasswordErrors.MIN_LENGTH]: 'Passwort muss mindestens 8 Zeichen haben',
      },
      username: {
        [DefaultErrors.EMPTY]: 'Pflichtfeld',
        [UsernameErrors.MIN_LENGTH]: 'Benutzername muss mindestens 3 Zeichen haben',
        [UsernameErrors.ALREADY_EXISTS]: 'Dieser Benutzername existiert bereits',
        [UsernameErrors.INVALID]: 'Ungültiger Benutzername',
      },
      email: {
        [EmailErrors.INVALID]: 'Ungültige E-Mail',
        [DefaultErrors.EMPTY]: 'Pflichtfeld',
        [EmailErrors.ALREADY_EXISTS]: 'Es existiert bereits ein Konto mit dieser E-Mail',
      },
    },

    locationStep: {
      title: 'Wir benötigen deinen Standort',
      description: 'um Sammler in deiner Nähe zu finden und das Tauschen zu erleichtern :)',
      allowButton: 'Standort erlauben',
      tryAgainButton: 'Erneut versuchen',
      permissionDenied: 'Zugriff verweigert. Standort in den Geräteeinstellungen aktivieren.',
      openSettings: 'Einstellungen öffnen',
    }
  },
  home: {
    title: 'CromoSwap',
    seeMoreButtonLabel: 'Mehr anzeigen',
    nearYou: {
      nearYouTitle: 'Sammler in der Nähe',
      seeProfile: 'Profil ansehen',
      trocables: 'TAUSCHBAR',
      noPermissionText: 'Um Sammler in der Nähe zu sehen, musst du ',
      noPermissionButton: 'Standortfreigabe erlauben',
      noPermissionButtonSettings: 'Standort aktivieren',
      inSettingsText: ' in den Einstellungen.'
    },
    albums: {
      albumsTitle: 'Deine Alben',
      noAlbums: 'Du hast noch keine Alben! Klicke unten, um zu sammeln!',
      noNearUsers: 'Keine Nutzer in der Nähe :(',
      totalStickers: quantity => `${quantity} Sticker`,
    },
  },
  chooseAlbum: {
    albumsTitle: 'Verfügbare Alben',
    seeMoreButtonLabel: 'Mehr anzeigen',
    searchPlaceholder: 'Z.B.: “WM 2026”',
  },
  myAlbums: {
    albumsTitle: 'Deine Alben',
    externalUserAlbumsTitle: 'Alben des Nutzers',
    seeMoreButtonLabel: 'Mehr anzeigen',
    searchPlaceholder: 'Z.B.: “WM 2026”',
    noAlbums: 'Du hast noch keine Alben! Klicke unten, um zu sammeln!',
    noAlbumsExternalUser: 'Der Nutzer hat noch keine Alben!',
    deleteSheet: {
      title: 'Möchtest du dieses Album wirklich löschen?',
      warning: 'Diese Aktion kann nicht rückgängig gemacht werden.',
      confirm: 'Ja, löschen',
      cancel: 'Abbrechen',
      error: 'Album konnte nicht gelöscht werden. Bitte erneut versuchen.',
    },
  },
  purchaseAlbum: {
    stickersLabel: quantity => `${quantity} Sticker`,
    collectAlbumButtonLabel: 'Album sammeln',
    goBackButtonLabel: 'Zurück',
  },
  nearYou: {
    title: 'Sammler in der Nähe',
    searchPlaceholder: 'Suche nach Alben oder Nutzern',
    seeProfile: 'Profil ansehen',
    message: 'Nachricht',
    youHave: 'DU HAST',
    youNeed: 'DU BRAUCHST',
  },
  album: {
    searchPlaceholder: 'Sticker suchen',
    categoryPlaceholder: 'Kategorie',
    categoryConfirm: 'Bestätigen',
    filterChips: {
      iHave: 'Ich habe',
      iMissing: 'Fehlen',
      myRepeated: 'Doppelt',
      userHave: 'Hat',
      userMissing: 'Fehlen',
      userRepeated: 'Doppelt',
      youNeed: 'DU BRAUCHST',
      youHave: 'DU HAST',
    },
    clearFilters: 'Filter löschen',
    stickersQty: quantity => `${quantity} Sticker angezeigt`,
  },
  userProfile: {
    editProfile: 'Profil bearbeiten',
    leave: 'Abmelden',
    yourAlbums: 'Deine Alben',
    seeMore: 'Mehr anzeigen',
    albums: 'alben',
    followers: 'Follower',
    following: 'folgt',
    follow: 'Folgen',
    unfollow: 'Nicht mehr folgen',
    sendMessage: 'Nachricht',

    noAlbums: 'Du hast noch keine Alben! Klicke unten, um zu sammeln!',

    externalUser: {
      tabs: {
        [TabEnum.YOU_NEED]: qty => `Du brauchst (${qty})`,
        [TabEnum.YOU_HAVE]: qty => `Du hast (${qty})`,
      },
      showAlbum: 'Album ansehen',
    }
  },
  about: {
    title: 'Über',
    support: 'Support',
    privacy: 'Datenschutzrichtlinie',
    terms: 'Nutzungsbedingungen',
    deleteAccount: 'Konto löschen',
    links: {
      support: 'https://www.cromoswap.app/de/support',
      privacy: 'https://www.cromoswap.app/de/datenschutz',
      terms: 'https://www.cromoswap.app/de/nutzungsbedingungen',
      deleteAccount: 'https://www.cromoswap.app/de/konto-löschen',
    }
  },
  notifications: {
    title: 'Benachrichtigungen',
    newFollower: 'folgt dir jetzt!',
    time: {
      now: 'Jetzt',
      minute: (time) => `${time}min`,
      hour: (time) => `${time}h`,
      day: (time) => `${time}T`,
    }
  },
  messages: {
    title: 'Nachrichten',
    messageCard: {
      you: 'Du: ',
    }
  },
  chat: {
    title: 'Nachrichten',
    placeholder: 'Schreibe deine Nachricht...'
  },
  followListScreen: {
    followers: 'Follower',
    following: 'Folgt',
    follow: 'Folgen',
    unfollow: 'Nicht mehr folgen',
  },
  editProfile: {
    title: 'Profil bearbeiten',
    usernameLabel: 'Benutzername',
    emailLabel: 'E-Mail',
    regionLabel: 'Standort',
    passwordLabel: 'Passwort',
    changePasswordButton: 'Passwort ändern',
  },
  editRegion: {
    title: 'Standort ändern',
    description: 'um Sammler in deiner Nähe zu finden und das Tauschen zu erleichtern :)',
    saveButton: 'Speichern',
  },
  pagination: {
    pageInfo: (current, total) => `Seite ${current} von ${total}`,
    categoriesLabel: 'Kategorien:',
  },
  editField: {
    passwordLabel: 'Passwort',
    placeholder: 'Neues Passwort eingeben',
    newPasswordLabel: 'Neues Passwort',
    confirmPasswordLabel: 'Neues Passwort bestätigen',
    confirmPasswordPlaceholder: 'Neues Passwort wiederholen',
    saveButton: 'Speichern',
    passwordMismatch: 'Passwörter stimmen nicht überein',
    selectStatePlaceholder: 'Bundesland auswählen',
    selectCityPlaceholder: 'Stadt auswählen',
    passwordRequirements: {
      minLength: 'Mindestens 8 Zeichen',
      uppercase: 'Großbuchstabe (A-Z)',
      lowercase: 'Kleinbuchstabe (a-z)',
      number: 'Zahl (0-9)',
      special: 'Sonderzeichen (!@#$%...)',
    },
  }
};

export default Locales;
