// React core
import React from 'react';
// External modules / Third-party libraries
import { Avatar, Text } from '@radix-ui/themes';
// Local components
import { LoadingSpinner } from '@/app/components/shared/layout/loadingSpinner/LoadingSpinner';
// Hooks and utilities
import { useSession } from 'next-auth/react';
import { setDarkMode } from '@/app/store/core/darkMode';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
// Styles
import styles from './UserInfos.module.css';

export const UserInfos = () => {
	const { data: session } = useSession();
	const name = session?.user?.name;
	const rank = session?.user?.rank;
	const { isDarkMode } = setDarkMode();

	if (!session) {
		return <LoadingSpinner />;
	}

	return (
		<div
			className={`${isDarkMode ? 'dark-theme' : ''} ${styles.container} `}
		>
			<Avatar
				src='/images/moi.jpg?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
				fallback='NC'
				radius={'full'}
				className={styles.avatar}
			/>
			<div className={styles.text_wrapper}>
				<Text as={'p'} size={'3'} trim={'both'} weight={'regular'}>
					{capitalizeFirstLetters(name)}
				</Text>
				<Text
					as={'p'}
					size={'2'}
					trim={'both'}
					weight={'bold'}
					className={styles.animated_text}
				>
					{capitalizeFirstLetters(rank)}
				</Text>
			</div>
		</div>
	);
};
