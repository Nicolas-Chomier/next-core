'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import Link from 'next/link';

// Local components
// Hooks and utilities
import { useSession } from 'next-auth/react';
import { setDarkMode } from '@/app/store/core/darkMode';
import { usePathname } from 'next/navigation';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import {
	LANDING_FOLDER_PATH,
	APP_SETTINGS_PAGES,
	DEFAULT_RANK,
	PAGES_NAMES,
} from '@/config/core/app_settings';
import {
	STANDARD_COLOR_DANGER,
	ICON_SIZE_M,
	ICON_STROKE_M,
	ICON_SIZE_XL,
} from '@/config/constantes';
// Styles
import styles from './LinkButton.module.css';
import { Menu, X } from 'lucide-react';

type TLinkButtonProps = {};

export const LinkButton = ({}: TLinkButtonProps) => {
	// SetUp
	const { isDarkMode } = setDarkMode();
	const [showMenu, setShowMenu] = useState(false);
	const { data: session } = useSession();
	const rank = session?.user?.rank;
	const pathname = usePathname();
	const pageName = pathname.split('/').at(-1);

	return (
		<div className={styles.multiButtonFrame}>
			<button
				className={`${isDarkMode ? 'dark-theme' : ''} ${
					styles.switch_base
				} ${styles.toggle_switch}`}
				onClick={() => setShowMenu(!showMenu)}
			>
				{showMenu ? (
					<X
						size={ICON_SIZE_M}
						strokeWidth={ICON_STROKE_M}
						color={STANDARD_COLOR_DANGER}
					/>
				) : (
					<Menu size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				)}
			</button>
			<div
				className={`${
					showMenu ? styles.showButton : styles.hiddenButton
				}`}
			>
				{PAGES_NAMES.map((page, index) => {
					return (
						<div key={`P-${index}`} className={styles.button1}>
							fzfezfzefze {/* <LinkSwitch page={page} /> */}
						</div>
					);
				})}
			</div>
		</div>
	);
};

const LinkSwitch = (page: any) => {
	console.log(page);
	const path = LANDING_FOLDER_PATH + '/' + page.folderName;
	const size = PAGES_NAMES.length - 1;
	const { isDarkMode } = setDarkMode();
	return (
		<Link href={path}>
			<div
				className={`${isDarkMode ? 'dark-theme' : ''} ${
					styles.switch_base
				} ${styles.toggle_switch}`}
			>
				<p className={styles.text}>
					{capitalizeFirstLetters(page.givenName)}
				</p>
			</div>
		</Link>
	);
};
