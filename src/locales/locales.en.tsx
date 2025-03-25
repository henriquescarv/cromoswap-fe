import React from 'react';

const Locales = {
	home: {
		helloLabel: 'Olá, mundo! Sou o Henrique.',
		chaveLabel: (<>{'> '}</>),
		devFrontLabel: 'Desenvolvedor Front-end',
		linkedinButtonLabel: 'LinkedIn',
		githubButtonLabel: 'GitHub',
		cvButtonLabel: 'Baixar CV',
		presentationLabel: (
			<>
				{'Estudante de '}
				<em>Sistemas de Informação</em>
				{'. Desde 2022 impactando milhares de usuários com projetos que utilizam '}
				<em>ReactJS, TypeScript, Redux, Jest</em>
				{', entre outras tecnologias.'}
			</>
		),
	},
};

export default Locales;
