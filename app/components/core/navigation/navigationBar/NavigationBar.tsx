// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { UserInfos } from '@/app/components/core/navigation/userInfos/UserInfos';
import { MultiButtonFrame } from '@/app/components/core/navigation/multiButtonFrame/MultiButtonFrame ';
import { LinkBar } from '@/app/components/core/navigation/linkBar/LinkBar';
import { Title } from '@/app/components/core/navigation/title/Title';
// Hooks and utilities
import useMediaQuery from '@/app/hooks/core/useMediaQuery';
// Configuration
import {
	MEDIAQUERY_BREAKPOINT_SMARTPHONE,
	MEDIAQUERY_BREAKPOINT_TABLET_PORTRAIT,
} from '@/config/constantes';
// Styles
import styles from './NavigationBar.module.css';

export const NavigationBar = () => {
	const isSmartphoneSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_SMARTPHONE);
	const isTabletSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_TABLET_PORTRAIT);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper_1}>
				{isTabletSize || isSmartphoneSize ? (
					<MultiButtonFrame />
				) : (
					<Title />
				)}
			</div>
			<div className={styles.wrapper_2}>
				<LinkBar />
			</div>
			{isSmartphoneSize ? null : (
				<div className={styles.wrapper_3}>
					<UserInfos />
					{isTabletSize ? null : <MultiButtonFrame />}
				</div>
			)}
		</div>
	);
};
