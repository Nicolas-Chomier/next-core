// React core
import { useCallback, useEffect } from 'react';
// External modules / Third-party libraries
import { AtSign, KeyRound, Type } from 'lucide-react';
// Local components
// Hooks and utilities
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
import { handleKeyDown } from '@/app/utils/core/handleKeyDown';
import { setDarkMode } from '@/app/store/core/darkMode';
// Configuration
import { ICON_SIZE_M, ICON_STROKE_M } from '@/config/constantes';
// Styles
import styles from './InputText.module.css';

type TInputTextProps = {
	type: 'text' | 'email' | 'password';
	label: string;
	placeholder: string;
	disabled: boolean;
	register: any;
	setValue?: any;
	errors: any;
};

export const InputText = ({
	type = 'text',
	label = 'text',
	placeholder = 'Votre texte',
	disabled = false,
	register,
	setValue,
	errors,
}: TInputTextProps) => {
	const { isDarkMode } = setDarkMode();

	/* const renderIcon = useCallback(() => {
		switch (type) {
			case 'email':
				return (
					<AtSign
						size={ICON_SIZE_M}
						strokeWidth={ICON_STROKE_M}
						className={styles.icon}
					/>
				);
			case 'password':
				return (
					<KeyRound
						size={ICON_SIZE_M}
						strokeWidth={ICON_STROKE_M}
						className={styles.icon}
					/>
				);
			case 'text':
				return (
					<Type
						size={ICON_SIZE_M}
						strokeWidth={ICON_STROKE_M}
						className={styles.icon}
					/>
				);
			default:
				return null;
		}
	}, [type]); */

	useEffect(() => {
		if (disabled) setValue(label, null);
	}, [disabled, label, setValue]);

	return (
		<div className={styles.container}>
			<input
				id={label}
				type={type}
				name={label}
				{...register(label)}
				placeholder={capitalizeFirstLetters(label) || placeholder}
				onKeyDown={(e) => handleKeyDown(e, type)}
				disabled={disabled}
				className={`${isDarkMode ? 'dark-theme' : ''} ${styles.input} ${
					errors[label] && styles.input_error
				}`}
			/>

			{/* {renderIcon()} */}

			<p className={styles.error_text}>
				{errors[label] ? errors[label].message : 'ㅤ'}
			</p>
		</div>
	);
};
