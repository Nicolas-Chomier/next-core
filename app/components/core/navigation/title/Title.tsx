// React core
import React from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { Text } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/core/darkMode';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import {
	APPLICATION_NAME,
	LANDING_FOLDER_PATH,
} from '@/config/core/app_settings';
// Styles
import styles from './Title.module.css';

export const Title = () => {
	const { isDarkMode } = setDarkMode();

	return (
		<Link href={LANDING_FOLDER_PATH}>
			<Text
				as='p'
				className={`${isDarkMode ? 'dark-theme' : ''} ${styles.title}`}
			>
				{capitalizeFirstLetters(APPLICATION_NAME)}
			</Text>
		</Link>
	);
};
