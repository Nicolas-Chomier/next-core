// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/darkMode';
// Configuration
// Styles
import styles from './Header.module.css';

type THeaderProps = {
	children: React.ReactNode;
};

export const Header = ({ children }: THeaderProps) => {
	const { isDarkMode } = setDarkMode();
	return (
		<div
			className={`${isDarkMode ? 'dark-theme' : ''} ${styles.container}`}
		>
			<div className={styles.wrapper}>{children}</div>
		</div>
	);
};
