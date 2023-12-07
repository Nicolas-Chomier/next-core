//! SHARED CONSTANTE DO NOT DELETE

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

//* APP NAME
export const APPLICATION_NAME = process.env.NEXT_PUBLIC_APPLICATION_NAME;

//* AUTHENTICATION
export const DEFAULT_USER = MASTER_LOGIN;

export const DUMMY_USER_INFOS = {
	id: 1,
	email: 'master@gmail.com',
	name: 'Nicolas',
	password: '$2b$10$cze4y1xUPAgPf.O7BHhIlOw3W237S8v7AZbtE4n.Afsw.qpYMNOcG',
	rank: 'master',
};

//* MAIN PATH
export const LANDING_FOLDER_PATH = '/pages';

//* SETTINGS PAGES
export const APP_SETTINGS_PAGES = {
	folderName: 'adminPanel',
	givenName: 'Admin_panel',
};

//* PAGES
export const PAGES_NAMES = [
	{ folderName: 'page_1', givenName: 'page1' },
	{ folderName: 'page_2', givenName: 'page2' },
	{ folderName: 'tests', givenName: 'Tests' },
];

//* SIGN IN OPTIONS
export const DEFAULT_SIGN_OPTION: {
	expiresIn?: string | number;
} = {
	expiresIn: '9h',
};

//* ADMIN TABLE USER CONFIG
type TUSER_CONFIG = {
	[key: string]: {
		color: string;
		removable: boolean;
	};
};

export const USERS_CONFIG: TUSER_CONFIG = {
	master: { color: 'red', removable: false },
	admin: { color: 'orange', removable: true },
	worker: { color: 'purple', removable: true },
	user: { color: 'blue', removable: true },
	guest: { color: 'green', removable: true },
};

export const DEFAULT_RANK = 'guest';
export const DEFAULT_ID_NUMBER = 9999;
