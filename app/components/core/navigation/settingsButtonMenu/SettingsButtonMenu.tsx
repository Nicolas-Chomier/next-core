'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
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
import { useRouter } from 'next/navigation';
import { setDarkMode } from '@/app/store/core/darkMode';
// Configuration
import { ACCOUNT_MANAGEMENT_PAGE, LANDING_PAGE } from '@/config/core/settings';
import {
	STANDARD_COLOR_DANGER,
	ICON_SIZE_M,
	ICON_STROKE_M,
} from '@/config/constantes';
// Styles
import styles from './SettingsButtonMenu.module.css';

export const MultiButtonFrame = () => {
	// Setup
	const router = useRouter();
	const { isDarkMode, toggleDarkMode } = setDarkMode();
	const [isMenuVisible, setMenuVisibility] = useState(false);

	const darkModeIcon = () => {
		return isDarkMode ? (
			<Sun size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
		) : (
			<Moon size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
		);
	};

	const tooltipMessage = isDarkMode ? 'Light Mode' : 'Dark Mode';

	return (
		<div className={styles.multiButtonFrame}>
			<button
				className={`${isDarkMode ? 'dark-theme' : ''} ${
					styles.switch_base
				} ${styles.toggle_switch}`}
				onClick={() => setMenuVisibility(!isMenuVisible)}
			>
				{isMenuVisible ? (
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
					isMenuVisible ? styles.showButton : styles.hiddenButton
				}`}
			>
				<div className={styles.button1}>
					<SettingSubSwitch
						handleClick={() => {
							toggleDarkMode(), setMenuVisibility(false);
						}}
						toolTip={tooltipMessage}
					>
						{darkModeIcon()}
					</SettingSubSwitch>
				</div>

				<div className={styles.button2}>
					<SettingSubSwitch
						handleClick={() => signOut({ callbackUrl: '/' })}
						toolTip={'Paramètres'}
					>
						<LogOut
							size={ICON_SIZE_M}
							strokeWidth={ICON_STROKE_M}
						/>
					</SettingSubSwitch>
				</div>

				<div className={styles.button3}>
					<SettingSubSwitch
						handleClick={() => {
							router.push(LANDING_PAGE), setMenuVisibility(false);
						}}
						toolTip={'Paramètres'}
					>
						<HomeIcon
							size={ICON_SIZE_M}
							strokeWidth={ICON_STROKE_M}
						/>
					</SettingSubSwitch>
				</div>

				<div className={styles.button4}>
					<SettingSubSwitch
						handleClick={() => {
							router.push(ACCOUNT_MANAGEMENT_PAGE),
								setMenuVisibility(false);
						}}
						toolTip={'Paramètres'}
					>
						<Settings
							size={ICON_SIZE_M}
							strokeWidth={ICON_STROKE_M}
						/>
					</SettingSubSwitch>
				</div>
			</div>
		</div>
	);
};

type TSettingSubSwitchProps = {
	handleClick: () => void;
	toolTip?: string | undefined;
	children: React.ReactNode;
};
const SettingSubSwitch = ({
	handleClick,
	toolTip,
	children,
}: TSettingSubSwitchProps) => {
	const { isDarkMode } = setDarkMode();

	return (
		<Tooltip content={toolTip || '...'}>
			<button
				onClick={handleClick}
				className={`${isDarkMode ? 'dark-theme' : ''} ${
					styles.switch_base
				} ${styles.sub_switch}`}
			>
				{children}
			</button>
		</Tooltip>
	);
};
