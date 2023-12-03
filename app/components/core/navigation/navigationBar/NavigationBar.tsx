// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { UserInfos } from '@/app/components/core/navigation/userInfos/UserInfos';
import { MultiButtonFrame } from '@/app/components/core/navigation/settingsButtonMenu/SettingsButtonMenu';
import { LinkBar } from '@/app/components/core/navigation/linkBar/LinkBar';
import { LinkButton } from '@/app/components/core/navigation/linkButtonMenu/LinkButtonMenu';
import { Title } from '@/app/components/core/navigation/title/Title';
// Hooks and utilities
import useMediaQuery from '@/app/hooks/core/useMediaQuery';
// Configuration
import {
	MEDIAQUERY_BREAKPOINT_SMALL_LAPTOP,
	MEDIAQUERY_BREAKPOINT_SMARTPHONE,
	MEDIAQUERY_BREAKPOINT_TABLET_PORTRAIT,
} from '@/config/constantes';
// Styles
import styles from './NavigationBar.module.css';

export const NavigationBar = () => {
	const isSmartphoneSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_SMARTPHONE);
	const isTabletSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_TABLET_PORTRAIT);
	const isLaptopSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_SMALL_LAPTOP);

	return (
		<div className={styles.container}>
			{!isSmartphoneSize && (
				<div className={styles.link_bar_wrapper}>
					<LinkBar />
				</div>
			)}

			<div className={styles.navigation_element_wrapper}>
				{isLaptopSize && <Title />}

				{(isSmartphoneSize || isTabletSize) && <MultiButtonFrame />}
				{isSmartphoneSize && <LinkButton />}
				{isTabletSize && <UserInfos />}

				{isLaptopSize && (
					<div className={styles.navigation_element_sub_part}>
						<UserInfos />
						<MultiButtonFrame />
					</div>
				)}
			</div>
		</div>
	);
};
