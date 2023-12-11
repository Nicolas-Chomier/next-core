// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/darkMode';
// Configuration
// Styles
import styles from './FormButton.module.css';
import { LoadingSpinner } from '../layout/loadingSpinner/LoadingSpinner';

type TFormButtonProps = {
	display: boolean;
	isLoading: boolean;
	label?: string;
};

export const FormButton = ({
	display,
	isLoading,
	label = 'Validation',
}: TFormButtonProps) => {
	const { isDarkMode } = setDarkMode();

	const renderButtonContent = () => {
		if (display && !isLoading) {
			return (
				<button
					type='submit'
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.container
					} ${styles.button}`}
				>
					{label}
				</button>
			);
		} else if (isLoading) {
			return <LoadingSpinner />;
		} else {
			return (
				<div
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.container
					} ${styles.dummy}`}
				>
					{label}
				</div>
			);
		}
	};
	return <>{renderButtonContent()}</>;
};
