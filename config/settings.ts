//! SHARED CONSTANTE DO NOT DELETE

//* APP NAME
export const APPLICATION_NAME = process.env.APPLICATION_NAME;

//* AUTHENTICATION
export const DEFAULT_USER = {
	email: 'master@gmail.com',
	password: 'master',
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
	{ folderName: 'informations', givenName: 'infos' },
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
