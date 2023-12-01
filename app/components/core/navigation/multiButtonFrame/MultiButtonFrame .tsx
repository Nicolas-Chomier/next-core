'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import Link from 'next/link';
import {
	HomeIcon,
	LogOut,
	Moon,
	Settings,
	Settings2,
	Sun,
	X,
} from 'lucide-react';
import { Tooltip } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { signOut, useSession } from 'next-auth/react';
import { setDarkMode } from '@/app/store/core/darkMode';
// Configuration
import {
	LANDING_FOLDER_PATH,
	APP_SETTINGS_PAGES,
	DEFAULT_RANK,
} from '@/config/core/app_settings';
import {
	STANDARD_COLOR_DANGER,
	ICON_SIZE_M,
	ICON_STROKE_M,
	ICON_SIZE_XL,
} from '@/config/constantes';
// Styles
import styles from './MultiButtonFrame.module.css';

export const MultiButtonFrame = () => {
	const { isDarkMode } = setDarkMode();
	const [showMenu, setShowMenu] = useState(false);
	const { data: session } = useSession();
	const rank = session?.user?.rank;

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
					<Settings2 size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				)}
			</button>
			<div
				className={`${
					showMenu ? styles.showButton : styles.hiddenButton
				}`}
			>
				<div className={styles.button1}>
					<HomeSwitch />
				</div>
				<div className={styles.button2}>
					<DarkModeSwitch />
				</div>
				<div className={styles.button3}>
					<LogOutSwitch />
				</div>
				{rank !== DEFAULT_RANK ? (
					<div className={styles.button4}>
						<SettingsSwitch rank={rank} />
					</div>
				) : null}
			</div>
		</div>
	);
};

const DarkModeSwitch = () => {
	const { isDarkMode, toggleDarkMode } = setDarkMode();
	const tooltipMessage = isDarkMode ? 'Light Mode' : 'Dark Mode';

	return (
		<Tooltip content={tooltipMessage}>
			<button
				onClick={toggleDarkMode}
				className={`${isDarkMode ? 'dark-theme' : ''} ${
					styles.switch_base
				} ${styles.sub_switch}`}
			>
				{isDarkMode ? (
					<Sun size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				) : (
					<Moon size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				)}
			</button>
		</Tooltip>
	);
};

const LogOutSwitch = () => {
	const { isDarkMode } = setDarkMode();
	return (
		<Tooltip content={'Log Out'}>
			<button
				className={`${isDarkMode ? 'dark-theme' : ''} ${
					styles.switch_base
				} ${styles.sub_switch}`}
				onClick={() => signOut({ callbackUrl: '/' })}
			>
				<LogOut size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
			</button>
		</Tooltip>
	);
};

const HomeSwitch = () => {
	const { isDarkMode } = setDarkMode();
	return (
		<Tooltip content={'Home page'}>
			<Link href={LANDING_FOLDER_PATH}>
				<button
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.switch_base
					} ${styles.sub_switch}`}
				>
					<HomeIcon size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				</button>
			</Link>
		</Tooltip>
	);
};

type TSettingsSwitchProps = {
	rank: string | null;
};

const SettingsSwitch = ({ rank }: TSettingsSwitchProps) => {
	const { isDarkMode } = setDarkMode();
	const appSettingPath =
		LANDING_FOLDER_PATH + '/' + APP_SETTINGS_PAGES.folderName + '/' + rank;

	return (
		<Tooltip content={'Settings'}>
			<Link href={appSettingPath}>
				<button
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.switch_base
					} ${styles.sub_switch}`}
				>
					<Settings size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				</button>
			</Link>
		</Tooltip>
	);
};
