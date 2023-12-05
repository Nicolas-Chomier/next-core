// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/core/darkMode';
// Configuration
// Styles
import styles from './FormButton.module.css';

type TFormButtonProps = { display: boolean };

export const FormButton = ({ display }: TFormButtonProps) => {
	const { isDarkMode } = setDarkMode();
	return (
		<>
			{display ? (
				<button
					type='submit'
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.container
					} ${styles.button}`}
				>
					Validation
				</button>
			) : (
				<div
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.container
					} ${styles.dummy}`}
				>
					En attente
				</div>
			)}
		</>
	);
};
