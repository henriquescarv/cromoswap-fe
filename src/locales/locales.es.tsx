import { TabEnum } from '@/screens/UserProfile/UserProfile.types';
import { CityErrors, DefaultErrors, EmailErrors, PasswordErrors, StateErrors, UsernameErrors } from '@/validators/forms/forms.types';

const Locales = {
  login: {
    title: '¡Bienvenido!',
    usernamePlaceholder: 'Nombre de usuario',
    passwordPlaceholder: 'Contraseña',
    loginButton: 'Entrar',
    noAccountLabel: '¿No tienes una cuenta? ',
    registerButton: '¡Regístrate!',
  },
  register: {
    title: '¡Regístrate!',
    description: 'Crea una cuenta para continuar',
    passwordStepTitle: 'Crea una contraseña',
    continueButton: 'Continuar',
    registerButton: '¡Regístrate!',
    goBackButton: 'Volver',
    termsText: 'Al registrarte, aceptas nuestros ',
    termsLink: 'Términos de uso',
    termsAnd: ' y ',
    privacyLink: 'Política de privacidad',
    links: {
      terms: 'https://www.cromoswap.app/es/terminos',
      privacy: 'https://www.cromoswap.app/es/privacidad',
    },
    inputs: {
      nameTitle: 'Nombre de usuario',
      namePlaceholder: 'Introduce tu nombre de usuario',
      emailTitle: 'Correo electrónico',
      emailPlaceholder: 'Introduce tu correo electrónico',
      passwordTitle: 'Contraseña',
      passwordPlaceholder: 'Crea una contraseña segura',
      confirmPasswordPlaceholder: 'Repite tu contraseña',
    },
    inputErrors: {
      password: {
        [DefaultErrors.EMPTY]: 'Campo obligatorio',
        [PasswordErrors.NOT_MATCHING]: 'Las contraseñas no coinciden',
        [PasswordErrors.MIN_LENGTH]: 'La contraseña debe tener al menos 8 caracteres',
      },
      username: {
        [DefaultErrors.EMPTY]: 'Campo obligatorio',
        [UsernameErrors.MIN_LENGTH]: 'El nombre de usuario debe tener al menos 3 caracteres',
        [UsernameErrors.ALREADY_EXISTS]: 'Este nombre de usuario ya existe',
        [UsernameErrors.INVALID]: 'Nombre de usuario inválido',
      },
      email: {
        [EmailErrors.INVALID]: 'Correo electrónico inválido',
        [DefaultErrors.EMPTY]: 'Campo obligatorio',
        [EmailErrors.ALREADY_EXISTS]: 'Ya existe una cuenta con este correo',
      },
    },

    locationStep: {
      title: 'Necesitamos tu ubicación',
      description: 'para encontrar coleccionistas cerca de ti y facilitar tus intercambios :)',
      allowButton: 'Permitir ubicación',
      tryAgainButton: 'Intentar de nuevo',
      permissionDenied: 'Permiso denegado. Habilita la ubicación en la configuración del dispositivo.',
      openSettings: 'Abrir configuración',
    }
  },
  home: {
    title: 'CromoSwap',
    seeMoreButtonLabel: 'Ver más',
    nearYou: {
      nearYouTitle: 'Coleccionistas cercanos',
      seeProfile: 'Ver perfil',
      trocables: 'INTERCAMBIABLES',
      noPermissionText: 'Para ver coleccionistas cercanos, necesitas ',
      noPermissionButton: 'permitir el uso de tu ubicación',
      noPermissionButtonSettings: 'habilitar tu ubicación',
      inSettingsText: ' en la configuración.'
    },
    albums: {
      albumsTitle: 'Tus álbumes',
      noAlbums: '¡Aún no tienes álbumes! Haz clic en el botón de abajo para empezar a coleccionar!',
      noNearUsers: 'Ningún usuario cercano :(',
      totalStickers: quantity => `${quantity} cromos`,
    },
  },
  chooseAlbum: {
    albumsTitle: 'Álbumes disponibles',
    seeMoreButtonLabel: 'Ver más',
    searchPlaceholder: 'Ej: “Copa 2026”',
  },
  myAlbums: {
    albumsTitle: 'Tus álbumes',
    externalUserAlbumsTitle: 'Álbumes del usuario',
    seeMoreButtonLabel: 'Ver más',
    searchPlaceholder: 'Ej: “Copa 2026”',
    noAlbums: '¡Aún no tienes álbumes! Haz clic en el botón de abajo para empezar a coleccionar!',
    noAlbumsExternalUser: '¡El usuario aún no tiene álbumes!',
    deleteSheet: {
      title: '¿Realmente deseas eliminar este álbum?',
      warning: 'Esta acción no se puede deshacer.',
      confirm: 'Sí, eliminar',
      cancel: 'Cancelar',
      error: 'No se pudo eliminar el álbum. Intenta de nuevo.',
    },
  },
  purchaseAlbum: {
    stickersLabel: quantity => `${quantity} cromos`,
    collectAlbumButtonLabel: 'Coleccionar álbum',
    goBackButtonLabel: 'Volver',
  },
  nearYou: {
    title: 'Coleccionistas cercanos',
    searchPlaceholder: 'Busca álbumes o usuarios',
    seeProfile: 'Ver perfil',
    message: 'Mensaje',
    youHave: 'TIENES',
    youNeed: 'NECESITAS',
  },
  album: {
    searchPlaceholder: 'Buscar cromo',
    categoryPlaceholder: 'Categoría',
    categoryConfirm: 'Confirmar',
    filterChips: {
      iHave: 'Tengo',
      iMissing: 'Faltan',
      myRepeated: 'Repetidas',
      userHave: 'Tiene',
      userMissing: 'Faltan',
      userRepeated: 'Repetidas',
      youNeed: 'NECESITAS',
      youHave: 'TIENES',
    },
    clearFilters: 'Limpiar filtros',
    stickersQty: quantity => `Mostrando ${quantity} cromos`,
  },
  userProfile: {
    editProfile: 'Editar perfil',
    leave: 'Salir',
    yourAlbums: 'Tus álbumes',
    seeMore: 'Ver más',
    albums: 'álbumes',
    followers: 'seguidores',
    following: 'siguiendo',
    follow: 'Seguir',
    unfollow: 'Dejar de seguir',
    sendMessage: 'Mensaje',

    noAlbums: '¡Aún no tienes álbumes! Haz clic en el botón de abajo para empezar a coleccionar!',

    externalUser: {
      tabs: {
        [TabEnum.YOU_NEED]: qty => `Necesitas (${qty})`,
        [TabEnum.YOU_HAVE]: qty => `Tienes (${qty})`,
      },
      showAlbum: 'Ver álbum',
    }
  },
  about: {
    title: 'Acerca de',
    support: 'Soporte',
    privacy: 'Política de privacidad',
    terms: 'Términos de uso',
    deleteAccount: 'Eliminar cuenta',
    links: {
      support: 'https://www.cromoswap.app/es/soporte',
      privacy: 'https://www.cromoswap.app/es/privacidad',
      terms: 'https://www.cromoswap.app/es/terminos',
      deleteAccount: 'https://www.cromoswap.app/es/eliminar-cuenta',
    }
  },
  notifications: {
    title: 'Notificaciones',
    newFollower: '¡empezó a seguirte!',
    time: {
      now: 'Ahora',
      minute: (time) => `${time}min`,
      hour: (time) => `${time}h`,
      day: (time) => `${time}d`,
    }
  },
  messages: {
    title: 'Mensajes',
    messageCard: {
      you: 'Tú: ',
    }
  },
  chat: {
    title: 'Mensajes',
    placeholder: 'Escribe tu mensaje...'
  },
  followListScreen: {
    followers: 'Seguidores',
    following: 'Siguiendo',
    follow: 'Seguir',
    unfollow: 'Dejar de seguir',
  },
  editProfile: {
    title: 'Editar perfil',
    usernameLabel: 'Nombre de usuario',
    emailLabel: 'Correo electrónico',
    regionLabel: 'Ubicación',
    passwordLabel: 'Contraseña',
    changePasswordButton: 'Cambiar contraseña',
  },
  editRegion: {
    title: 'Cambiar ubicación',
    description: 'para encontrar coleccionistas cerca de ti y facilitar tus intercambios :)',
    saveButton: 'Guardar',
  },
  pagination: {
    pageInfo: (current, total) => `Página ${current} de ${total}`,
    categoriesLabel: 'Categorías:',
  },
  editField: {
    passwordLabel: 'Contraseña',
    placeholder: 'Introduce la nueva contraseña',
    newPasswordLabel: 'Nueva contraseña',
    confirmPasswordLabel: 'Confirma la nueva contraseña',
    confirmPasswordPlaceholder: 'Repite la nueva contraseña',
    saveButton: 'Guardar',
    passwordMismatch: 'Las contraseñas no coinciden',
    selectStatePlaceholder: 'Selecciona tu estado',
    selectCityPlaceholder: 'Selecciona tu ciudad',
    passwordRequirements: {
      minLength: 'Mínimo 8 caracteres',
      uppercase: 'Letra mayúscula (A-Z)',
      lowercase: 'Letra minúscula (a-z)',
      number: 'Número (0-9)',
      special: 'Carácter especial (!@#$%...)',
    },
  }
};

export default Locales;
