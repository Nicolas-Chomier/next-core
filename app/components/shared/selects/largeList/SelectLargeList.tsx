// React core
import React, { useRef, useState } from 'react';
// External modules / Third-party libraries
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
// Local components
// Hooks and utilities
import { useOnClickOutside } from '@/app/hooks/core/useOnClickOutside';
import { setDarkMode } from '@/app/store/core/darkMode';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import { ICON_SIZE_M, ICON_STROKE_M } from '@/config/constantes';
// Styles
import styles from './LargeListSelect.module.css';

type TSelectLargeListProps = {
	field: { name: string; value: string; onChange: (value: string) => void };
	contentToDisplay: string[];
	placeHolder?: string;
};

export const SelectLargeList = ({
	field,
	contentToDisplay = ['...'],
	placeHolder,
}: TSelectLargeListProps) => {
	// State and references for display and interaction management
	const [deploy, setDeploy] = useState(false);
	const containerRef = useRef(null);

	// Hook to manage clicks outside the component and close the drop-down menu
	useOnClickOutside(containerRef, () => setDeploy(false));

	// Functions for selecting items in the list
	const handleSelect = (item: string) => {
		field.onChange(item);
		setDeploy(false);
	};

	// JSX
	return (
		<div className={styles.container} ref={containerRef}>
			<div className={styles.trigger} onClick={() => setDeploy(!deploy)}>
				<div className={styles.placeHolder}>
					{field.value ||
						placeHolder ||
						capitalizeFirstLetters(field.name)}
				</div>

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

// ExpandPanelSwitch sub-component to manage drop-down panel display
type TExpandPanelSwitchProps = {
	toggle: boolean;
};
const ExpandPanelSwitch = ({ toggle }: TExpandPanelSwitchProps) => {
	return (
		<div className={styles.toggle_switch}>
			{toggle ? (
				<ChevronUp size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
			) : (
				<ChevronDown size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
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
	const size = content.length;
	const { isDarkMode } = setDarkMode();
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
