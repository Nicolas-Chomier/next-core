'use client';
// React core
import React, { useEffect, useRef, useState } from 'react';
// External modules / Third-party libraries
import { ChevronDown, ChevronUp, Trash2, XCircle } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
// Local components
// Hooks and utilities
import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';
import { setDarkMode } from '@/app/store/core/darkMode';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import { ICON_SIZE_S, STANDARD_COLOR_DANGER } from '@/config/constantes';
// Styles
import styles from './LargeListMultiSelect.module.css';

type TLargeListMultiSelectProps = {
	field: any;
	contentToDisplay: string[];
};

// Calcul the panel height according given itemList
const getPanelSize = (num: number): string =>
	`${num <= 8 ? num * 36.8 : 300}px`;

export const LargeListMultiSelect = ({
	field,
	contentToDisplay = ['...'],
}: TLargeListMultiSelectProps) => {
	const { isDarkMode } = setDarkMode();
	const [deploy, setDeploy] = useState(false);

	const size = contentToDisplay?.length;
	const listRef = useRef<string[]>([]);
	const ref = useRef(null);

	const handleClickOutside = () => {
		setDeploy(false);
	};

	const [placeHolder, setPlaceHolder] = useState('Select ...');

	useOnClickOutside(ref, handleClickOutside);

	const getMultiSelection = (field: any, item: string) => {
		listRef.current.push(item);
		field.onChange([...listRef.current]);
	};

	useEffect(() => {
		if (!field.value) {
			listRef.current = [];
		}
	}, [field.value]);

	const handleDelete = (item: string) => {
		console.log(item);
	};
	const handleReset = () => {
		field.onChange([]), (listRef.current = []), setPlaceHolder('...');
	};

	return (
		<div className={styles.container} ref={ref}>
			<div className={styles.title}>
				{capitalizeFirstLetters(field.name)}
			</div>
			<div
				className={styles.content_wrapper}
				onClick={() => setDeploy(true)}
			>
				<BadgeDisplayer field={field} handleClick={handleDelete} />
				<ResetButton field={field} handleClick={handleReset} />
				<ExpandPanelButton toggle={deploy} />
			</div>

			{deploy ? (
				<Virtuoso
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.largeList_wrapper
					}`}
					style={{
						height: deploy && getPanelSize(size),
					}}
					totalCount={size}
					itemContent={(index) => {
						const item = contentToDisplay[index];
						return (
							<div
								key={index}
								onClick={() => {
									getMultiSelection(field, item);
								}}
								className={styles.largeList_element_buttons}
							>
								{item}
							</div>
						);
					}}
				/>
			) : null}
		</div>
	);
};

//
type TBadgeDisplayerProps = {
	field: any;
	handleClick: (item: string) => void;
};
const BadgeDisplayer = ({ field, handleClick }: TBadgeDisplayerProps) => {
	const { isDarkMode } = setDarkMode();

	if (!Array.isArray(field?.value)) {
		return null;
	}

	return (
		<>
			{field.value.map((item: string, index: number) => (
				<span
					key={`Badge-${index}`}
					onClick={() => handleClick(item)}
					className={`${isDarkMode ? 'dark-theme' : ''} ${
						styles.badge
					}`}
				>
					{capitalizeFirstLetters(item.substring(0, 4) + '...')}
				</span>
			))}
		</>
	);
};

//
type TResetButtonProps = {
	field: any;
	handleClick: () => void;
};
const ResetButton = ({ field, handleClick }: TResetButtonProps) => {
	const { isDarkMode } = setDarkMode();
	return (
		<button
			onClick={() => handleClick()}
			className={`${isDarkMode ? 'dark-theme' : ''} ${
				styles.delete_button
			}`}
		>
			{field.value ? <XCircle size={ICON_SIZE_S} /> : null}
		</button>
	);
};

//
type TExpandPanelButtonProps = {
	toggle: boolean;
};
const ExpandPanelButton = ({ toggle }: TExpandPanelButtonProps) => {
	return (
		<div className={styles.panel_button}>
			{toggle ? (
				<ChevronUp size={ICON_SIZE_S} />
			) : (
				<ChevronDown size={ICON_SIZE_S} />
			)}
		</div>
	);
};
