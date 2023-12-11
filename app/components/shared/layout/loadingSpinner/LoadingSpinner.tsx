// React core
// External modules / Third-party libraries
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/darkMode';
// Configuration
// Styles
import styles from './LoadingSpinner.module.css';

type TLoadingSpinnerProps = {
	color?: 'white' | 'black' | undefined;
};

export const LoadingSpinner = ({ color = undefined }: TLoadingSpinnerProps) => {
	const { isDarkMode } = setDarkMode();

	return (
		<span
			className={`${!color && isDarkMode ? 'dark-theme' : ''} ${
				color === 'white' && styles.spinner_white
			} ${color === 'black' && styles.spinner_black} ${styles.spinner}`}
		></span>
	);
};
