// React core
import React from 'react';
// External modules / Third-party libraries
import { Avatar, Tooltip } from '@radix-ui/themes';
import {
	HomeIcon,
	LogOut,
	MapPin,
	Moon,
	Search,
	Settings,
	Sun,
} from 'lucide-react';
// Local components
// Hooks and utilities
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { setDarkMode } from '@/app/store/core/darkMode';
// Configuration
import { ICON_SIZE_M, ICON_STROKE_M } from '@/config/constantes';
import { ACCOUNT_MANAGEMENT_PAGE, LANDING_PAGE } from '@/config/core/settings';
// Styles
import styles from './SideBar.module.css';

type TSideBarProps = {};

export const SideBar = ({}: TSideBarProps) => {
	const router = useRouter();
	const { isDarkMode, toggleDarkMode } = setDarkMode();
	const { data: session } = useSession();
	const name = session?.user?.name;

	const darkModeIcon = () => {
		return isDarkMode ? (
			<Sun size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
		) : (
			<Moon size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
		);
	};

	const tooltipMessage = isDarkMode ? 'Light Mode' : 'Dark Mode';
	return (
		<div className={styles.container}>
			<div className={styles.admin_wrapper}>
				<Tooltip content={name || '...'} side='right'>
					<Avatar
						src='/images/moi.jpg?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop'
						fallback='NC'
						radius={'full'}
						className={styles.avatar}
					/>
				</Tooltip>
			</div>
			<div className={styles.switch_wrapper}>
				<SettingSubSwitch
					handleClick={() => {
						router.push(LANDING_PAGE);
					}}
					toolTip={'Carte de France'}
				>
					<MapPin size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				</SettingSubSwitch>

				<SettingSubSwitch
					handleClick={() => {
						router.push(LANDING_PAGE);
					}}
					toolTip={'Recherche'}
				>
					<Search size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				</SettingSubSwitch>

				<SettingSubSwitch
					handleClick={() => signOut({ callbackUrl: '/' })}
					toolTip={'Déconnexion'}
				>
					<LogOut size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				</SettingSubSwitch>

				<SettingSubSwitch
					handleClick={() => {
						toggleDarkMode();
					}}
					toolTip={tooltipMessage}
				>
					{darkModeIcon()}
				</SettingSubSwitch>

				<SettingSubSwitch
					handleClick={() => {
						router.push(ACCOUNT_MANAGEMENT_PAGE);
					}}
					toolTip={'Paramètres'}
				>
					<Settings size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				</SettingSubSwitch>
			</div>
			<div className={styles.compensator}></div>
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
		<Tooltip content={toolTip || '...'} side='right'>
			<button
				onClick={handleClick}
				className={`${isDarkMode ? 'dark-theme' : ''} ${styles.switch}`}
			>
				{children}
			</button>
		</Tooltip>
	);
};
