// React core
import { useCallback, useEffect, useRef, useState } from 'react';
// External modules / Third-party libraries
// Local components
// Hooks and utilities
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
import { handleKeyDown } from '@/app/utils/core/handleKeyDown';
// Configuration
// Styles
import styles from './InputText.module.css';
import { setDarkMode } from '@/app/store/core/darkMode';
import { AtSign, KeyRound, Type } from 'lucide-react';
import { ICON_SIZE_M, ICON_STROKE_M } from '@/config/constantes';
import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';

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
	const [inputValue, setInputValue] = useState(false);

	const renderIcon = useCallback(() => {
		if (inputValue) return null;
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
	}, [type, inputValue]);

	const handleChange = (e: any) => {
		console.log('Valeur actuelle :', e.target.value);
		if (e.target.value) {
			setInputValue(true);
		} else {
			setInputValue(false);
		}
	};

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
				onChange={handleChange}
				placeholder={capitalizeFirstLetters(label) || placeholder}
				onKeyDown={(e) => handleKeyDown(e, type)}
				disabled={disabled}
				className={`${isDarkMode ? 'dark-theme' : ''} ${styles.input} ${
					errors[label] && styles.input_error
				}`}
			/>

			{renderIcon()}

			<p className={styles.error_text}>
				{errors[label] ? errors[label].message : 'ㅤ'}
			</p>
		</div>
	);
};
