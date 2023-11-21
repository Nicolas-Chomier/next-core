// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { UserInfos } from '@/app/components/core/layout/navigation/userInfos/UserInfos';
import { MultiButtonFrame } from '@/app/components/core/layout/navigation/multiButtonFrame/MultiButtonFrame ';
import { LinkBar } from '@/app/components/core/layout/navigation/linkBar/LinkBar';
import { AppTitle } from '@/app/components/core/layout/navigation/appTitle/AppTitle';
// Hooks and utilities
import useMediaQuery from '@/app/hooks/core/useMediaQuery';
// Configuration
import {
	MEDIAQUERY_BREAKPOINT_SMARTPHONE,
	MEDIAQUERY_BREAKPOINT_TABLET_PORTRAIT,
} from '@/config/const';
// Styles
import styles from './NavBar.module.css';

export const NavBar = () => {
	const isSmartphoneSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_SMARTPHONE);
	const isTabletSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_TABLET_PORTRAIT);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper_1}>
				{isTabletSize || isSmartphoneSize ? (
					<MultiButtonFrame />
				) : (
					<AppTitle />
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
