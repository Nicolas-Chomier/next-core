//! DO NOT DELETE !

//* AUTHENTICATION
const DEV = process.env.NODE_ENV !== 'production';

let MASTER_LOGIN;

if (DEV) {
	console.log('Mode développement');
	MASTER_LOGIN = {
		email: 'master@gmail.com',
		password: 'master',
	};
} else {
	MASTER_LOGIN = undefined;
}

export const DEFAULT_USER = MASTER_LOGIN;
export const DUMMY_USER_INFOS = {
	id: 1,
	email: 'master@gmail.com',
	name: 'Nicolas',
	password: '$2b$10$cze4y1xUPAgPf.O7BHhIlOw3W237S8v7AZbtE4n.Afsw.qpYMNOcG',
	rank: 'master',
};

//* SIGN IN OPTIONS
export const DEFAULT_SIGN_OPTION: {
	expiresIn?: string | number;
} = {
	expiresIn: '9h',
};
