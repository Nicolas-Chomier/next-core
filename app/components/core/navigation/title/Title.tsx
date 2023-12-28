// React core
import React from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { Text } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import { NAVIGATION_BAR_TITLE, LANDING_PAGE } from '@/config/core/settings';
// Styles
import styles from './Title.module.css';

export const Title = () => {
	return (
		<Link href={LANDING_PAGE}>
			<Text as='p' className={styles.title}>
				{capitalize(NAVIGATION_BAR_TITLE) || ''}
			</Text>
		</Link>
	);
};
