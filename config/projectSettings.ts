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
