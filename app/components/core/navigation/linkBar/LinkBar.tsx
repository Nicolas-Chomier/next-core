'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Local components
// Hooks and utilities
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import { LANDING_PAGE } from '@/config/core/settings';
import { PAGES_NAMES } from '@/config/projectPages';
// Styles
import styles from './LinkBar.module.css';

export const LinkBar = () => {
	// SetUp
	const pathname = usePathname();
	const pageName = pathname.split('/').at(-1);

	if (PAGES_NAMES && PAGES_NAMES.length === 0) {
		return <div></div>;
	}

	return (
		<div className={styles.container}>
			{PAGES_NAMES.map((page, index) => {
				const path = LANDING_PAGE + '/' + page.folderName;

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
								{capitalize(page.givenName)}
							</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
