//! PROJECT SETTINGS

//* ORACLE DB CONFIG
export const ODB_CONFIG = {
	user: process.env.DATABASE_ORACLE_USER,
	password: process.env.DATABASE_ORACLE_PASSWORD,
	connectString: process.env.DATABASE_ORACLE_CONNECTSTRING,
};

//* PROJECT DATES SETTINGS
export const DATEFORMAT = 'dd/MM/yyyy';
export const MINIMUM_ALLOWED_DATE = new Date('01/01/2022');

//* PAGES
export const PAGES_NAMES = [
	{ folderName: 'page_1', givenName: 'Example1' },
	{ folderName: 'page_2', givenName: 'Example2' },
	{ folderName: 'tests', givenName: 'Tests' },
];
