// React core
import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
import { Flex, Select, Text } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { Controller } from 'react-hook-form';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
// Styles
import styles from './InputSelect.module.css';

type TInputSelectProps = {
	label: string;
	itemList: string[];
	control: any;
	defaultValue?: string;
};

export const InputSelect = ({
	label,
	itemList = ['null'],
	control,
	defaultValue = itemList[0],
}: TInputSelectProps) => {
	return (
		<Flex
			direction={'column'}
			align={'start'}
			justify={'between'}
			className={'component_wrapper_smartPhone_first'}
		>
			<Text>{capitalizeFirstLetters(label)}</Text>

			<Controller
				control={control}
				name={label}
				defaultValue={defaultValue}
				render={({ field }) => (
					<Select.Root
						value={field.value}
						onValueChange={field.onChange}
					>
						<Select.Trigger
							className={styles.select_trigger}
							radius={'medium'}
						/>
						<Select.Content
							className={styles.select}
							position='popper'
						>
							{itemList.map((item) => (
								<Select.Item key={`key-${item}`} value={item}>
									{capitalizeFirstLetters(item)}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				)}
			/>
		</Flex>
	);
};
