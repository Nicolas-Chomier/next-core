'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/core/darkMode';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import { LANDING_FOLDER_PATH } from '@/config/core/app_settings';
import { PAGES_NAMES } from '@/config/project_settings';
import {
	STANDARD_COLOR_DANGER,
	ICON_SIZE_M,
	ICON_STROKE_M,
} from '@/config/constantes';
// Styles
import styles from './LinkButtonMenu.module.css';

export const LinkButton = () => {
	const { isDarkMode } = setDarkMode();
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);
	const menuIcon = showMenu ? (
		<X
			size={ICON_SIZE_M}
			strokeWidth={ICON_STROKE_M}
			color={STANDARD_COLOR_DANGER}
		/>
	) : (
		<Menu size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
	);

	return (
		<div className={styles.multiButtonFrame}>
			<button
				className={`${isDarkMode ? 'dark-theme' : ''} ${
					styles.switch_base
				} ${styles.toggle_switch}`}
				onClick={toggleMenu}
			>
				{menuIcon}
			</button>
			<div
				className={`${
					showMenu ? styles.showButton : styles.hiddenButton
				}`}
			>
				{PAGES_NAMES.map((page) => (
					<div key={page.folderName} className={styles.button_shape}>
						<Link
							href={`${LANDING_FOLDER_PATH}/${page.folderName}`}
							className={`${isDarkMode ? 'dark-theme' : ''} ${
								styles.link_button
							}`}
						>
							<p className={styles.text}>
								{capitalizeFirstLetters(page.givenName)}
							</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
