// React core
import React, { useEffect, useRef, useState } from 'react';
// External modules / Third-party libraries
import { ChevronDown, ChevronUp } from 'lucide-react';
// Local components
// Hooks and utilities
import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';
import { capitalize } from '@/app/functions/capitalize';
import { setDarkMode } from '@/app/store/darkMode';
// Configuration
import { ICON_SIZE_M, ICON_STROKE_M } from '@/config/constantes';
// Styles
import styles from './SelectBasic.module.css';

type TInputSelectProps = {
	field: { name: string; onChange: (value: string) => void };
	contentToDisplay: string[];
	placeHolder?: string;
};

export const SelectBasic = ({
	field,
	contentToDisplay = ['...'],
	placeHolder,
}: TInputSelectProps) => {
	const [controledContent, setControledContent] = useState<string[]>(['...']);
	const [toggleIcon, setToggleIcon] = useState(false);
	const { isDarkMode } = setDarkMode();
	const selectRef = useRef(null);

	const handleClickOutside = () => {
		setToggleIcon(false);
	};

	useOnClickOutside(selectRef, handleClickOutside);

	useEffect(() => {
		setControledContent(contentToDisplay);
	}, [contentToDisplay]);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		field.onChange(value);
		setToggleIcon(true);
	};

	return (
		<div className={`${styles.container}`}>
			<select
				ref={selectRef}
				id={field.name}
				onChange={handleChange}
				onClick={() => setToggleIcon(!toggleIcon)}
				className={`${isDarkMode ? 'dark-theme' : ''} ${styles.select}`}
				defaultValue={'DEFAULT'}
			>
				<option value='DEFAULT' disabled className={styles.placeHolder}>
					{capitalize(field.name) || placeHolder}
				</option>

				{controledContent.map((row, index) => (
					<option
						key={`${index}-${row}`}
						value={row}
						className={styles.options}
					>
						{row}
					</option>
				))}
			</select>
			<div className={styles.icon}>
				{toggleIcon ? (
					<ChevronUp size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				) : (
					<ChevronDown
						size={ICON_SIZE_M}
						strokeWidth={ICON_STROKE_M}
					/>
				)}
			</div>
		</div>
	);
};
