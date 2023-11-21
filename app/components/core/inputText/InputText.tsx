// React core
import { useEffect } from 'react';
// External modules / Third-party libraries
import { Flex, Text } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
import { handleKeyDown } from '@/app/utils/core/handleKeyDown';
// Configuration
import { STANDARD_COLOR_DANGER } from '@/config/const';
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
	useEffect(() => {
		disabled && setValue(label, null);
	}, [disabled, label, setValue]);

	return (
		<Flex
			gap='0'
			direction={'column'}
			align={'start'}
			justify={'center'}
			className={'component_wrapper_smartPhone_first'}
		>
			<Text
				className={styles.input_text_label}
				color={errors[label] ? STANDARD_COLOR_DANGER : undefined}
			>
				{errors[label]
					? errors[label].message
					: capitalizeFirstLetters(label.replace('_', ' '))}
			</Text>

			<input
				id={label}
				type={type}
				name={label}
				{...register(label)}
				placeholder={placeholder}
				onKeyDown={(e) => handleKeyDown(e, type)}
				disabled={disabled}
				style={{ borderRadius: `3px` }}
			/>
		</Flex>
	);
};
