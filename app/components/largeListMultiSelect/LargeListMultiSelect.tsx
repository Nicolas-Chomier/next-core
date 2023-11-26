'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
// Local components
import { CustomCard } from '../core/layout/customCard/CustomCard';
// Hooks and utilities
import { setDarkMode } from '@/app/store/core/darkMode';
import { Controller } from 'react-hook-form';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import { ICON_SIZE_S } from '@/config/constantes';
// Styles
import styles from './LargeListSelect.module.css';

type TLargeListMultiSelectProps = {
	label: string;
	itemList: string[];
	control: any;
};

// Calcul the panel height according given itemList
const getPanelSize = (num: number): string =>
	`${num <= 8 ? num * 36.8 : 300}px`;

export const LargeListMultiSelect = ({
	label,
	itemList = ['...'],
	control,
}: TLargeListMultiSelectProps) => {
	const { isDarkMode } = setDarkMode();
	const [deploy, setDeploy] = useState(false);
	const size = itemList?.length;

	return (
		<CustomCard>
			<Controller
				control={control}
				name={label}
				render={({ field }) => (
					<div className={'component_wrapper_smartPhone_first'}>
						<div className={styles.largeList_title}>
							{capitalizeFirstLetters(label) || '...'}
						</div>
						<div
							className={styles.largeList_trigger_wrapper}
							onClick={() => setDeploy(!deploy)}
						>
							<div className={styles.largeList_trigger}>
								{field.value || 'Click !'}
							</div>
							<div className={styles.largeList_icon}>
								{deploy ? (
									<ChevronUp size={ICON_SIZE_S} />
								) : (
									<ChevronDown size={ICON_SIZE_S} />
								)}
							</div>
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
									const item = itemList[index];
									return (
										<div
											key={index}
											onClick={() => {
												field.onChange(item);
												setDeploy(!deploy);
											}}
											className={
												styles.largeList_element_buttons
											}
										>
											{item}
										</div>
									);
								}}
							/>
						) : null}
					</div>
				)}
			/>
		</CustomCard>
	);
};
