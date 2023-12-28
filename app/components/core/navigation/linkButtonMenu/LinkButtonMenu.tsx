'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
// Local components
// Hooks and utilities
import { capitalize } from '@/app/functions/capitalize';
// Configuration
import { LANDING_PAGE } from '@/config/core/settings';
import { PAGES_NAMES } from '@/config/projectPages';
import {
	STANDARD_COLOR_DANGER,
	ICON_SIZE_M,
	ICON_STROKE_M,
} from '@/config/constantes';
// Styles
import styles from './LinkButtonMenu.module.css';

export const LinkButton = () => {
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
				className={` ${styles.switch_base} ${styles.toggle_switch}`}
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
							href={`${LANDING_PAGE}/${page.folderName}`}
							className={styles.link_button}
						>
							<p className={styles.text}>
								{capitalize(page.givenName)}
							</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};
