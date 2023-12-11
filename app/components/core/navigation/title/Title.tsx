// React core
import React from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { Text } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/darkMode';
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import { NAVIGATION_BAR_TITLE, LANDING_PAGE } from '@/config/core/settings';
// Styles
import styles from './Title.module.css';

export const Title = () => {
	const { isDarkMode } = setDarkMode();

	return (
		<Link href={LANDING_PAGE}>
			<Text
				as='p'
				className={`${isDarkMode ? 'dark-theme' : ''} ${styles.title}`}
			>
				{capitalize(NAVIGATION_BAR_TITLE) || ''}
			</Text>
		</Link>
	);
};
