'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/core/darkMode';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import { LANDING_FOLDER_PATH, PAGES_NAMES } from '@/config/settings';
// Styles
import styles from './LinkBar.module.css';

export const LinkBar = () => {
	// SetUp
	const pathname = usePathname();
	const pageName = pathname.split('/').at(-1);
	const { isDarkMode } = setDarkMode();

	return (
		<div
			className={`${isDarkMode ? 'dark-theme' : ''} ${styles.container}`}
		>
			{PAGES_NAMES.map((page, index) => {
				const path = LANDING_FOLDER_PATH + '/' + page.folderName;
				const size = PAGES_NAMES.length - 1;
				return (
					<Link key={`p-${index}`} href={path}>
						<div
							className={`${
								page.folderName === pageName
									? styles.actual_page
									: ''
							} ${styles.items}`}
						>
							<p className={styles.text}>
								{capitalizeFirstLetters(
									page.givenName.replace('_', ' '),
								)}
							</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
