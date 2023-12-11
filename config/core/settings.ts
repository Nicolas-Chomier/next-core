//! DO NOT DELETE !

//* APP LABELS
export const AUTHENTICATION_PAGE_TITLE = process.env.NEXT_PUBLIC_TITLE;
export const NAVIGATION_BAR_TITLE = process.env.NEXT_PUBLIC_NAV_NAME;

//* PATH FOR NATIVE PAGE
export const LANDING_PAGE = '/pages';
export const ACCOUNT_MANAGEMENT_PAGE = LANDING_PAGE + '/' + 'AccountManagement';

//* TITLE FOR NATIVE PAGE
export const LANDING_PAGE_TITLE = '';
export const ACCOUNT_MANAGEMENT_PAGE_TITLE = 'Paramètres';

//@ ADMIN TABLE USER CONFIG  (WIP)
type TUSER_CONFIG = {
	[key: string]: {
		color: string;
		removable: boolean;
		administrator: boolean;
	};
};

export const USERS_CONFIG: TUSER_CONFIG = {
	master: { color: 'red', removable: false, administrator: true },
	admin: { color: 'orange', removable: true, administrator: true },
	worker: { color: 'purple', removable: true, administrator: false },
	user: { color: 'blue', removable: true, administrator: false },
	guest: { color: 'green', removable: true, administrator: false },
};

export const DEFAULT_RANK = 'guest';
export const DEFAULT_ID_NUMBER = 9999;
