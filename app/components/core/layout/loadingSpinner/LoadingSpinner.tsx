// React core
// External modules / Third-party libraries
import { Box } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/core/darkMode';
// Configuration
// Styles
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = () => {
	const { isDarkMode } = setDarkMode();

	return (
		<Box
			className={`${isDarkMode ? 'dark-theme' : ''} ${styles.spinner}`}
		></Box>
	);
};
