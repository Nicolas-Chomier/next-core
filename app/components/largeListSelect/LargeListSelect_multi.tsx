'use client';
// React core
import React, { useEffect, useRef, useState } from 'react';
// External modules / Third-party libraries
import { ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
// Local components
// Hooks and utilities
import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';
import { setDarkMode } from '@/app/store/core/darkMode';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import {
	ICON_SIZE_M,
	ICON_STROKE_S,
	STANDARD_COLOR_DANGER,
} from '@/config/constantes';
// Styles
import styles from './LargeListSelect.module.css';

type TLargeListMultiSelectProps = {
	field: any;
	contentToDisplay: string[];
	placeHolder?: string;
};

export const LargeListSelect_multi = ({
	field,
	contentToDisplay = ['...'],
	placeHolder = 'Select...',
}: TLargeListMultiSelectProps) => {
	// State and references for display and interaction management
	const [deploy, setDeploy] = useState(false);
	const listRef = useRef<string[]>([]);
	const containerRef = useRef(null);

	// Hook to manage clicks outside the component and close the drop-down menu
	useOnClickOutside(containerRef, () => setDeploy(false));

	// Functions for deleting, resetting and selecting items in the list
	const handleDelete = (value: string) => {
		listRef.current = listRef.current.filter((item) => item !== value);
		field.onChange([...listRef.current]);
	};
	const handleReset = () => {
		field.onChange([]), (listRef.current = []);
	};
	const handleSelect = (item: string) => {
		listRef.current.push(item);
		field.onChange([...listRef.current]);
	};

	// Effect to reset the list reference when modifying the field
	useEffect(() => {
		if (!field.value) {
			listRef.current = [];
		}
	}, [field.value]);

	// JSX
	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.title}>
				{capitalizeFirstLetters(field.name)}
			</div>

			<div className={styles.trigger} onClick={() => setDeploy(true)}>
				{!field.value || field.value.length === 0 ? (
					<span className={styles.placeHolder}>{placeHolder}</span>
				) : null}
				<BadgeDisplayer field={field} handleClick={handleDelete} />
				<ResetButton field={field} handleClick={handleReset} />
				<ExpandPanelSwitch toggle={deploy} />
			</div>

			{deploy ? (
				<div className={` ${styles.large_list_wrapper}`}>
					<LargeList
						content={contentToDisplay}
						handleClick={handleSelect}
					></LargeList>
				</div>
			) : null}
		</div>
	);
};

// BadgeDisplayer sub-component to display badges for selected items
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
		<div className={styles.badge_wrapper}>
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
		</div>
	);
};

// ResetButton subcomponent to provide a reset button
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
				styles.reset_button
			}`}
		>
			{!field.value || field.value.length === 0 ? null : (
				<XCircle
					size={ICON_SIZE_M}
					strokeWidth={ICON_STROKE_S}
					color={STANDARD_COLOR_DANGER}
				/>
			)}
		</button>
	);
};

// ExpandPanelSwitch sub-component to manage drop-down panel display
type TExpandPanelSwitchProps = {
	toggle: boolean;
};
const ExpandPanelSwitch = ({ toggle }: TExpandPanelSwitchProps) => {
	return (
		<div className={styles.toggle_switch}>
			{toggle ? (
				<ChevronUp size={ICON_SIZE_M} strokeWidth={ICON_STROKE_S} />
			) : (
				<ChevronDown size={ICON_SIZE_M} strokeWidth={ICON_STROKE_S} />
			)}
		</div>
	);
};

// LargeList subcomponent to display the list of items with Virtuoso
type TLargeListProps = {
	content: any;
	handleClick: (item: string) => void;
};
const LargeList = ({ content, handleClick }: TLargeListProps) => {
	const { isDarkMode } = setDarkMode();
	const size = content.length;

	return (
		<Virtuoso
			className={`${isDarkMode ? 'dark-theme' : ''} ${
				styles.large_list_shape
			}`}
			style={{
				height: `${size <= 8 ? size * 36.8 : 300}px`,
			}}
			totalCount={size}
			itemContent={(index) => {
				const item = content[index];
				return (
					<div
						key={index}
						onClick={() => {
							handleClick(item);
						}}
						className={styles.large_list_item}
					>
						{item}
					</div>
				);
			}}
		/>
	);
};
