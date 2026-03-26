import { TabEnum } from '@/screens/UserProfile/UserProfile.types';
import { CityErrors, DefaultErrors, EmailErrors, PasswordErrors, StateErrors, UsernameErrors } from '@/validators/forms/forms.types';

const Locales = {
  login: {
    title: 'Benvenuto!',
    usernamePlaceholder: 'Nome utente',
    passwordPlaceholder: 'Password',
    loginButton: 'Accedi',
    noAccountLabel: 'Non hai un account? ',
    registerButton: 'Registrati!',
  },
  register: {
    title: 'Registrati!',
    description: 'Crea un account per continuare',
    passwordStepTitle: 'Crea una password',
    continueButton: 'Continua',
    registerButton: 'Registrati!',
    goBackButton: 'Indietro',
    termsText: 'Registrandoti, accetti i nostri ',
    termsLink: 'Termini di utilizzo',
    termsAnd: ' e ',
    privacyLink: 'Politica sulla privacy',
    links: {
      terms: 'https://www.cromoswap.app/it/termini',
      privacy: 'https://www.cromoswap.app/it/privacy',
    },
    inputs: {
      nameTitle: 'Nome utente',
      namePlaceholder: 'Inserisci il tuo nome utente',
      emailTitle: 'Email',
      emailPlaceholder: 'Inserisci la tua email',
      passwordTitle: 'Password',
      passwordPlaceholder: 'Crea una password sicura',
      confirmPasswordPlaceholder: 'Ripeti la password',
    },
    inputErrors: {
      password: {
        [DefaultErrors.EMPTY]: 'Campo obbligatorio',
        [PasswordErrors.NOT_MATCHING]: 'Le password non corrispondono',
        [PasswordErrors.MIN_LENGTH]: 'La password deve avere almeno 8 caratteri',
      },
      username: {
        [DefaultErrors.EMPTY]: 'Campo obbligatorio',
        [UsernameErrors.MIN_LENGTH]: 'Il nome utente deve avere almeno 3 caratteri',
        [UsernameErrors.ALREADY_EXISTS]: 'Questo nome utente esiste già',
        [UsernameErrors.INVALID]: 'Nome utente non valido',
      },
      email: {
        [EmailErrors.INVALID]: 'Email non valida',
        [DefaultErrors.EMPTY]: 'Campo obbligatorio',
        [EmailErrors.ALREADY_EXISTS]: 'Esiste già un account con questa email',
      },
    },

    locationStep: {
      title: 'Abbiamo bisogno della tua posizione',
      description: 'per trovare collezionisti vicino a te e facilitare i tuoi scambi :)',
      allowButton: 'Consenti posizione',
      tryAgainButton: 'Riprova',
      permissionDenied: 'Permesso negato. Abilita la posizione nelle impostazioni del dispositivo.',
      openSettings: 'Apri impostazioni',
    }
  },
  home: {
    title: 'CromoSwap',
    seeMoreButtonLabel: 'Vedi altro',
    nearYou: {
      nearYouTitle: 'Collezionisti vicini',
      seeProfile: 'Vedi profilo',
      trocables: 'SCAMBIABILI',
      noPermissionText: 'Per vedere i collezionisti vicini, devi ',
      noPermissionButton: 'consentire l\'uso della posizione',
      noPermissionButtonSettings: 'abilitare la posizione',
      inSettingsText: ' nelle impostazioni.'
    },
    albums: {
      albumsTitle: 'I tuoi album',
      noAlbums: 'Non hai ancora album! Clicca sul pulsante qui sotto per iniziare a collezionare!',
      noNearUsers: 'Nessun utente vicino :(',
      totalStickers: quantity => `${quantity} figurine`,
    },
  },
  chooseAlbum: {
    albumsTitle: 'Album disponibili',
    seeMoreButtonLabel: 'Vedi altro',
    searchPlaceholder: 'Es: “Copa 2026”',
  },
  myAlbums: {
    albumsTitle: 'I tuoi album',
    externalUserAlbumsTitle: 'Album dell\'utente',
    seeMoreButtonLabel: 'Vedi altro',
    searchPlaceholder: 'Es: “Copa 2026”',
    noAlbums: 'Non hai ancora album! Clicca sul pulsante qui sotto per iniziare a collezionare!',
    noAlbumsExternalUser: 'L\'utente non ha ancora album!',
    deleteSheet: {
      title: 'Vuoi davvero eliminare questo album?',
      warning: 'Questa azione non può essere annullata.',
      confirm: 'Sì, elimina',
      cancel: 'Annulla',
      error: 'Impossibile eliminare l\'album. Riprova.',
    },
  },
  purchaseAlbum: {
    stickersLabel: quantity => `${quantity} figurine`,
    collectAlbumButtonLabel: 'Colleziona album',
    goBackButtonLabel: 'Indietro',
  },
  nearYou: {
    title: 'Collezionisti vicini',
    searchPlaceholder: 'Cerca album o utenti',
    seeProfile: 'Vedi profilo',
    message: 'Messaggio',
    youHave: 'HAI',
    youNeed: 'TI SERVE',
  },
  album: {
    searchPlaceholder: 'Cerca figurina',
    categoryPlaceholder: 'Categoria',
    categoryConfirm: 'Conferma',
    filterChips: {
      iHave: 'Ho',
      iMissing: 'Mancano',
      myRepeated: 'Doppioni',
      userHave: 'Ha',
      userMissing: 'Mancano',
      userRepeated: 'Doppioni',
      youNeed: 'TI SERVE',
      youHave: 'HAI',
    },
    clearFilters: 'Pulisci filtri',
    stickersQty: quantity => `Mostrando ${quantity} figurine`,
  },
  userProfile: {
    editProfile: 'Modifica profilo',
    leave: 'Esci',
    yourAlbums: 'I tuoi album',
    seeMore: 'Vedi altro',
    albums: 'album',
    followers: 'follower',
    following: 'seguiti',
    follow: 'Segui',
    unfollow: 'Smetti di seguire',
    sendMessage: 'Messaggio',

    noAlbums: 'Non hai ancora album! Clicca sul pulsante qui sotto per iniziare a collezionare!',

    externalUser: {
      tabs: {
        [TabEnum.YOU_NEED]: qty => `Ti serve (${qty})`,
        [TabEnum.YOU_HAVE]: qty => `Hai (${qty})`,
      },
      showAlbum: 'Vedi album',
    }
  },
  about: {
    title: 'Informazioni',
    support: 'Supporto',
    privacy: 'Politica sulla privacy',
    terms: 'Termini di utilizzo',
    deleteAccount: 'Elimina account',
    links: {
      support: 'https://www.cromoswap.app/it/supporto',
      privacy: 'https://www.cromoswap.app/it/privacy',
      terms: 'https://www.cromoswap.app/it/termini',
      deleteAccount: 'https://www.cromoswap.app/it/elimina-account',
    }
  },
  notifications: {
    title: 'Notifiche',
    newFollower: 'ha iniziato a seguirti!',
    time: {
      now: 'Ora',
      minute: (time) => `${time}min`,
      hour: (time) => `${time}h`,
      day: (time) => `${time}g`,
    }
  },
  messages: {
    title: 'Messaggi',
    messageCard: {
      you: 'Tu: ',
    }
  },
  chat: {
    title: 'Messaggi',
    placeholder: 'Scrivi il tuo messaggio...'
  },
  followListScreen: {
    followers: 'Follower',
    following: 'Seguiti',
    follow: 'Segui',
    unfollow: 'Smetti di seguire',
  },
  editProfile: {
    title: 'Modifica profilo',
    usernameLabel: 'Nome utente',
    emailLabel: 'Email',
    regionLabel: 'Posizione',
    passwordLabel: 'Password',
    changePasswordButton: 'Cambia password',
  },
  editRegion: {
    title: 'Cambia posizione',
    description: 'per trovare collezionisti vicino a te e facilitare i tuoi scambi :)',
    saveButton: 'Salva',
  },
  pagination: {
    pageInfo: (current, total) => `Pagina ${current} di ${total}`,
    categoriesLabel: 'Categorie:',
  },
  editField: {
    passwordLabel: 'Password',
    placeholder: 'Inserisci la nuova password',
    newPasswordLabel: 'Nuova password',
    confirmPasswordLabel: 'Conferma nuova password',
    confirmPasswordPlaceholder: 'Ripeti la nuova password',
    saveButton: 'Salva',
    passwordMismatch: 'Le password non corrispondono',
    selectStatePlaceholder: 'Seleziona la tua regione',
    selectCityPlaceholder: 'Seleziona la tua città',
    passwordRequirements: {
      minLength: 'Minimo 8 caratteri',
      uppercase: 'Lettera maiuscola (A-Z)',
      lowercase: 'Lettera minuscola (a-z)',
      number: 'Numero (0-9)',
      special: 'Carattere speciale (!@#$%...)',
    },
  }
};

export default Locales;
