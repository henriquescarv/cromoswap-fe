import { TabEnum } from '@/screens/UserProfile/UserProfile.types';
import { CityErrors, DefaultErrors, EmailErrors, PasswordErrors, StateErrors, UsernameErrors } from '@/validators/forms/forms.types';

const Locales = {
  login: {
    title: 'Bem vindo! ',
    usernamePlaceholder: 'Nome de usuário',
    passwordPlaceholder: 'Senha',
    loginButton: 'Entrar',
    noAccountLabel: 'Não possui uma conta? ',
    registerButton: 'Cadastre-se!',
  },
  register: {
    title: 'Cadastre-se!',
    error: 'Erro ao criar conta. Tente novamente.',
    description: 'Crie uma conta para continuar',
    passwordStepTitle: 'Crie uma senha',
    continueButton: 'Continuar',
    registerButton: 'Cadastre-se!',
    goBackButton: 'Voltar',
    termsText: 'Ao se cadastrar, você concorda com nossos ',
    termsLink: 'Termos de Uso',
    termsAnd: ' e ',
    privacyLink: 'Políticas de Privacidade',
    links: {
      terms: 'https://www.cromoswap.app/pt-br/terms',
      privacy: 'https://www.cromoswap.app/pt-br/privacy',
    },
    inputs: {
      nameTitle: 'Nome de usuário',
      namePlaceholder: 'Digite seu nome de usuário',
      emailTitle: 'E-mail',
      emailPlaceholder: 'Digite seu E-mail',
      passwordTitle: 'Senha',
      passwordPlaceholder: 'Crie uma senha forte',
      confirmPasswordPlaceholder: 'Repita sua senha',
    },
    inputErrors: {
      password: {
        [DefaultErrors.EMPTY]: 'Campo obrigatório',
        [PasswordErrors.NOT_MATCHING]: 'As senhas não coincidem',
        [PasswordErrors.MIN_LENGTH]: 'A senha deve ter no mínimo 8 caracteres',
      },
      username: {
        [DefaultErrors.EMPTY]: 'Campo obrigatório',
        [UsernameErrors.MIN_LENGTH]: 'O nome de usuário deve ter no mínimo 3 caracteres',
        [UsernameErrors.ALREADY_EXISTS]: 'Este nome de usuário já existe',
        [UsernameErrors.INVALID]: 'Nome de usuário inválido',
      },
      email: {
        [EmailErrors.INVALID]: 'E-mail inválido',
        [DefaultErrors.EMPTY]: 'Campo obrigatório',
        [EmailErrors.ALREADY_EXISTS]: 'Já existe uma conta com este e-mail',
      },
    },

    locationStep: {
      title: 'Precisamos da sua localização',
      description: 'para encontrar colecionadores próximos a você e facilitar suas trocas :)',
      allowButton: 'Permitir localização',
      tryAgainButton: 'Tentar novamente',
      skipButton: 'Pular por enquanto',
      permissionDenied: 'Permissão negada. Habilite a localização nas configurações do dispositivo.',
      openSettings: 'Abrir configurações',
    }
  },
  home: {
    title: 'CromoSwap',
    seeMoreButtonLabel: 'Ver mais',
    nearYou: {
      nearYouTitle: 'Trocadores próximos',
      seeProfile: 'Ver perfil',
      trocables: (qty) => qty === 1 ? 'TROCÁVEL' : 'TROCÁVEIS',
      noPermissionText: 'Para ver outros colecionadores próximos e conseguir trocar suas figurinhas, ative sua localização.',
      noPermissionButton: 'Permitir localização',
      noPermissionButtonSettings: 'Abrir configurações',
      inSettingsText: ''
    },
    albums: {
      albumsTitle: 'Seus álbuns',
      noAlbums: 'Você ainda não possui álbuns! Clique no botão abaixo para começar a colecionar!',
      noNearUsers: 'Nenhum usuário próximo :(',
      totalStickers: quantity => `${quantity} cromos`,
    },
  },
  errors: {
    retry: 'Recarregar',
  },
  chooseAlbum: {
    albumsTitle: 'Álbuns disponíveis',
    seeMoreButtonLabel: 'Ver mais',
    searchPlaceholder: 'Ex: "Copa 2026"', empty: 'Você já tem todos os álbuns!',
    emptySearch: 'Nenhum álbum encontrado',
    error: 'Não foi possível carregar os álbuns disponíveis',
  },
  myAlbums: {
    albumsTitle: 'Seus álbuns',
    externalUserAlbumsTitle: 'Álbuns do usuário',
    seeMoreButtonLabel: 'Ver mais',
    searchPlaceholder: 'Ex: “Copa 2026”',
    noAlbums: 'Você ainda não possui álbuns! Clique no botão abaixo para começar a colecionar!',
    noAlbumsExternalUser: 'O usuário ainda não possui álbuns!', error: 'Não foi possível carregar os álbuns', deleteSheet: {
      title: 'Deseja mesmo excluir este álbum?',
      warning: 'Esta ação não poderá ser desfeita.',
      confirm: 'Sim, excluir',
      cancel: 'Cancelar',
      error: 'Não foi possível excluir o álbum. Tente novamente.',
    },
  },
  purchaseAlbum: {
    stickersLabel: quantity => `${quantity} cromos`,
    collectAlbumButtonLabel: 'Colecionar álbum',
    goBackButtonLabel: 'Voltar',
    error: 'Erro ao colecionar este álbum. Tente novamente.',
  },
  nearYou: {
    title: 'Trocadores próximos',
    searchPlaceholder: 'Pesquise por álbuns ou usuários',
    seeProfile: 'Ver perfil',
    message: 'Mensagem',
    youHave: 'VOCÊ POSSUI',
    youNeed: 'VOCÊ PRECISA',
    error: 'Não foi possível carregar os usuários próximos',
  },
  album: {
    searchPlaceholder: 'Buscar cromo',
    categoryPlaceholder: 'Categoria',
    categoryConfirm: 'Confirmar',
    error: 'Não foi possível carregar os cromos',
    filterChips: {
      iHave: 'Tenho',
      iMissing: 'Faltam',
      myRepeated: 'Repetidas',
      userHave: 'Tem',
      userMissing: 'Faltam',
      userRepeated: 'Repetidas',
      youNeed: 'VOCÊ PRECISA',
      youHave: 'VOCÊ POSSUI',
    },
    clearFilters: 'Limpar filtros',
    stickersQty: quantity => `Exibindo ${quantity} cromos`,
    empty: 'Nenhum cromo encontrado',
  },
  userProfile: {
    editProfile: 'Editar perfil',
    leave: 'Sair',
    yourAlbums: 'Seus álbuns',
    seeMore: 'Ver mais',
    albums: 'álbuns',
    followers: 'seguidores',
    following: 'seguindo',
    follow: 'Seguir',
    unfollow: 'Deixar de seguir',
    sendMessage: 'Mensagem',
    followError: 'Erro ao seguir usuário. Tente novamente.',
    unfollowError: 'Erro ao deixar de seguir. Tente novamente.',

    noAlbums: 'Você ainda não possui álbuns! Clique no botão abaixo para começar a colecionar!',

    externalUser: {
      tabs: {
        [TabEnum.YOU_NEED]: qty => `Você precisa (${qty})`,
        [TabEnum.YOU_HAVE]: qty => `Você possui (${qty})`,
      },
      showAlbum: 'Ver álbum',
    }
  },
  about: {
    title: 'Sobre',
    support: 'Suporte',
    privacy: 'Política de privacidade',
    terms: 'Termos de uso',
    deleteAccount: 'Deletar conta',
    links: {
      support: 'https://www.cromoswap.app/pt-br/support',
      privacy: 'https://www.cromoswap.app/pt-br/privacy',
      terms: 'https://www.cromoswap.app/pt-br/terms',
      deleteAccount: 'https://www.cromoswap.app/pt-br/delete-account',
    }
  },
  notifications: {
    title: 'Notificações',
    newFollower: 'começou a seguir você!',
    empty: 'Nenhuma notificação por aqui',
    time: {
      now: 'Agora',
      minute: (time) => `${time}min`,
      hour: (time) => `${time}h`,
      day: (time) => `${time}d`,
    }
  },
  messages: {
    title: 'Mensagens',
    empty: 'Nenhuma conversa ainda',
    messageCard: {
      you: 'Você: ',
    }
  },
  chat: {
    title: 'Mensagens',
    placeholder: 'Digite sua mensagem...',
    error: 'Erro ao enviar mensagem. Tente novamente.',
  },
  followListScreen: {
    followers: 'Seguidores',
    following: 'Seguindo',
    follow: 'Seguir',
    unfollow: 'Deixar de seguir',
  },
  editProfile: {
    title: 'Editar Perfil',
    usernameLabel: 'Nome de usuário',
    emailLabel: 'E-mail',
    regionLabel: 'Localização',
    passwordLabel: 'Senha',
    changePasswordButton: 'Alterar senha',
  },
  editRegion: {
    title: 'Alterar localização',
    description: 'para encontrar colecionadores próximos a você e facilitar suas trocas :)',
    saveButton: 'Salvar',
  },
  pagination: {
    pageInfo: (current, total) => `Página ${current} de ${total}`,
    categoriesLabel: 'Categorias:',
  },
  editField: {
    passwordLabel: 'Senha',
    placeholder: 'Digite a nova senha',
    newPasswordLabel: 'Nova senha',
    confirmPasswordLabel: 'Confirme a nova senha',
    confirmPasswordPlaceholder: 'Repita a nova senha',
    saveButton: 'Salvar',
    passwordMismatch: 'As senhas não coincidem',
    selectStatePlaceholder: 'Selecione seu estado',
    selectCityPlaceholder: 'Selecione sua cidade',
    passwordRequirements: {
      minLength: 'Mínimo de 8 caracteres',
      uppercase: 'Letra maiúscula (A-Z)',
      lowercase: 'Letra minúscula (a-z)',
      number: 'Número (0-9)',
      special: 'Caractere especial (!@#$%...)',
    },
  }
};

export default Locales;
