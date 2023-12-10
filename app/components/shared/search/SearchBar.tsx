// React core
import React, { useState, useMemo, useRef } from 'react';
// External modules / Third-party libraries
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
// Local components
// Hooks and utilities
import { useOnClickOutside } from '@/app/hooks/useOnClickOutside';
import { setDarkMode } from '@/app/store/core/darkMode';
// Configuration
import { ICON_SIZE_M, ICON_STROKE_M } from '@/config/constantes';
// Styles
import styles from './SearchBar.module.css';

// Props type for SearchBar component
type TSearchBarProps = {
	data: string[];
	onChange: (value: string) => void;
};

export const SearchBar = ({ data, onChange }: TSearchBarProps) => {
	const { isDarkMode } = setDarkMode();
	const containerRef = useRef(null);
	// Hook to manage clicks outside the component and close the drop-down menu
	useOnClickOutside(containerRef, () => setPanelVisibility(false));

	// State for managing the visibility of dropdown panel
	const [isPanelVisible, setPanelVisibility] = useState(false);

	// State for the current value of the search input
	const [searchValue, setSearchValue] = useState('');

	// Event handler for changes in the search input
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value);
	};

	// Event handler for selecting an item from the dropdown
	const handleItemClick = (item: string) => {
		onChange(item);
		setSearchValue(item);
		setPanelVisibility(false);
	};

	// Reset input value
	const handleReset = () => {
		setSearchValue('');
		setPanelVisibility(!isPanelVisible);
	};

	// Filtering the data based on the search input
	const filteredData = useMemo(
		() =>
			data.filter((item: string) =>
				item.toLowerCase().includes(searchValue.toLowerCase()),
			),
		[data, searchValue],
	);
	return (
		<div
			className={`${isDarkMode ? 'dark-theme' : ''} ${styles.container}`}
			ref={containerRef}
		>
			<div className={styles.wrapper}>
				<div
					className={styles.searchIcon}
					onClick={() => handleReset()}
				>
					<Search size={ICON_SIZE_M} strokeWidth={ICON_STROKE_M} />
				</div>
				<input
					className={styles.input}
					type='text'
					onChange={handleInputChange}
					value={searchValue}
				/>
				<div
					className={styles.switch}
					onClick={() => setPanelVisibility(!isPanelVisible)}
				>
					{isPanelVisible ? (
						<ChevronUp
							size={ICON_SIZE_M}
							strokeWidth={ICON_STROKE_M}
						/>
					) : (
						<ChevronDown
							size={ICON_SIZE_M}
							strokeWidth={ICON_STROKE_M}
						/>
					)}
				</div>
			</div>
			{isPanelVisible && (
				<div className={styles.panel}>
					<ul className={styles.ulList}>
						{filteredData.map((item) => (
							<li
								onClick={() => handleItemClick(item)}
								key={item}
								className={styles.items}
							>
								{item}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
