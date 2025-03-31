import { DefaultErrors, EmailErrors, PasswordErrors, UsernameErrors } from '@/validators/forms/forms.types';

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
		registerButton: 'Cadastrar-se',
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
	}
};

export default Locales;
