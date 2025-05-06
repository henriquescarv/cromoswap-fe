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
		description: 'Crie uma conta para continuar',
		continueButton: 'Continuar',
		registerButton: 'Cadastre-se!',
		goBackButton: 'Voltar',
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
				[UsernameErrors.ALREADY_EXISTS]: 'Nome de usuário já existe',
				[UsernameErrors.INVALID]: 'Nome de usuário inválido',
			},
			email: {
				[UsernameErrors.INVALID]: 'E-mail inválido',
				[DefaultErrors.EMPTY]: 'Campo obrigatório',
				[EmailErrors.ALREADY_EXISTS]: 'Já existe uma conta com este e-mail',
			},
		},

		regionStep: {
			title: 'Precisamos da sua localização',
			description: 'para encontrar colecionadores próximos a você e facilitar suas trocas :)',
			countryStatePlaceholder: 'Selecione seu estado',
			searchStatePlaceholder: 'Ex: Santa Catarina',
			cityPlaceholder: 'Selecione sua cidade',
			searchCityPlaceholder: 'Ex: Florianópolis',

			errors: {
				countryState: {
					[StateErrors.EMPTY]: 'Campo obrigatório',
				},
				city: {
					[CityErrors.EMPTY]: 'Campo obrigatório',
				},
			}
		}
	},
	home: {
		title: 'CromoSwap',
		seeMoreButtonLabel: 'Ver mais',
		nearYou: {
			nearYouTitle: 'Perto de você',
			seeProfile: 'Ver perfil',
			trocables: 'TROCÁVEIS',
		},
		albums: {
			albumsTitle: 'Seus álbuns',
			noAlbums: 'Você ainda não possui álbuns! Clique no botão abaixo para começar a colecionar!',
			totalStickers: quantity => `${quantity} cromos`,
		},
	},
	chooseAlbum: {
		albumsTitle: 'Álbuns disponíveis',
		seeMoreButtonLabel: 'Ver mais',
		searchPlaceholder: 'Ex: “Copa 2026”',
	},
	myAlbums: {
		albumsTitle: 'Seus álbuns',
		seeMoreButtonLabel: 'Ver mais',
		searchPlaceholder: 'Ex: “Copa 2026”',
		noAlbums: 'Você ainda não possui álbuns! Clique no botão abaixo para começar a colecionar!',
	},
	purchaseAlbum: {
		stickersLabel: quantity => `${quantity} cromos`,
		collectAlbumButtonLabel: 'Colecionar álbum',
		goBackButtonLabel: 'Voltar',
	},
	nearYou: {
		title: 'Perto de você',
		searchPlaceholder: 'Pesquise por álbuns ou usuários',
		seeProfile: 'Ver perfil',
		message: 'Mensagem',
		youHave: 'VOCÊ PRECISA',
		youNeed: 'VOCÊ POSSUI',
	},
	album: {
		searchPlaceholder: 'Ex: “Portugal, Cristiano, 200”',
		filterChips: {
			have: 'Tenho',
			missing: 'Faltam',
			repeated: 'Repetidas',
			youNeed: 'VOCÊ PRECISA',
			youHave: 'VOCÊ POSSUI',
		},
		clearFilters: 'Limpar filtros',
		stickersQty: quantity => `Exibindo ${quantity} cromos`,
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
		sendMessage: 'Enviar mensagem',

		noAlbums: 'Você ainda não possui álbuns! Clique no botão abaixo para começar a colecionar!',

		externalUser: {
			tabs: {
				[TabEnum.YOU_NEED]: qty => `Você precisa (${qty})`,
				[TabEnum.YOU_HAVE]: qty => `Você possui (${qty})`,
			},
			showAlbum: 'Ver álbum',
		}
	},
	notifications: {
		title: 'Notificações',
		newFollower: 'começou a seguir você!',
		time: {
			now: 'Agora',
			minute: (time) => `${time}min`,
			hour: (time) => `${time}h`,
			day: (time) => `${time}d`,
		}
	},
	messages: {
		title: 'Mensagens',
	},
	chat: {
		title: 'Mensagens',
		placeholder: 'Digite sua mensagem...',
	}
};

export default Locales;
