// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
import { setDarkMode } from '@/app/store/core/darkMode';
// Configuration
// Styles
import styles from './FormButton.module.css';

type TFormButtonProps = { display: boolean; isLoading: boolean };

export const FormButton = ({ display, isLoading }: TFormButtonProps) => {
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
					{isLoading ? (
						<span className={styles.mini_spinner}></span>
					) : (
						'Validation'
					)}
				</button>
			) : (
				<div
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.container
					} ${styles.dummy}`}
				>
					Validation
				</div>
			)}
		</>
	);
};
