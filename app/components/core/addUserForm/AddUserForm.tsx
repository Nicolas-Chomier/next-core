// React core
import React from 'react';
// External modules / Third-party libraries
import { Button, Grid } from '@radix-ui/themes';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
// Local components
import { InputSelect } from '@/app/components/core/inputSelect/InputSelect';
import { InputText } from '@/app/components/core/inputText/InputText';
import { CustomCard } from '@/app/components/core/layout/customCard/CustomCard';
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
import useMediaQuery from '@/app/hooks/core/useMediaQuery';
// Configuration
import {
	STANDARD_COLOR_SUCCESS,
	NATIVE_COMPONENT_VARIANT,
	NATIVE_COMPONENT_RADIUS,
	MEDIAQUERY_BREAKPOINT_SMARTPHONE,
} from '@/config/constantes';
import { USERS_CONFIG } from '@/config/core/app_settings';
import { AddUserSchema } from '@/app/utils/schema/addUserForm';
// Styles
import styles from './AddUserForm.module.css';
import { SelectBasic } from '../../shared/select/basic/SelectBasic';

type TAddUserFormProps = {
	handlePost: (obj: TAddUserForm) => void;
};

type TAddUserForm = {
	email: string;
	name: string;
	rank: string;
	password: string;
};

export const AddUserForm = ({ handlePost }: TAddUserFormProps) => {
	// Build ranking list for the input select component
	const rankingList = Object.keys(USERS_CONFIG).splice(1, 4);
	const selectDefaultValue = rankingList.at(-1);
	const isSmartphoneSize = useMediaQuery(MEDIAQUERY_BREAKPOINT_SMARTPHONE);

	// Use form hook which manage the entire form
	const {
		setValue,
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid },
	} = useForm<TAddUserForm>({
		mode: 'onChange',
		resolver: zodResolver(AddUserSchema),
	});

	// Send Data to page component above and reset form
	const submitData = async (data: TAddUserForm) => {
		handlePost(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(submitData)} className={styles.container}>
			<Grid
				gap='5'
				columns={isSmartphoneSize ? '1' : '2'}
				align={'start'}
				justify={'center'}
			>
				<InputText
					type='email'
					label='email'
					placeholder='Email...'
					disabled={false}
					register={register}
					setValue={setValue}
					errors={errors}
				/>

				<InputText
					type='text'
					label='name'
					placeholder='Name...'
					disabled={false}
					register={register}
					setValue={setValue}
					errors={errors}
				/>

				<InputText
					type='password'
					label='password'
					placeholder='Password...'
					disabled={false}
					register={register}
					setValue={setValue}
					errors={errors}
				/>

				<Controller
					control={control}
					name='rank'
					render={({ field }) => (
						<SelectBasic
							field={field}
							contentToDisplay={rankingList}
						></SelectBasic>
					)}
				/>
			</Grid>
			{isValid ? (
				<Button
					color={STANDARD_COLOR_SUCCESS}
					variant={NATIVE_COMPONENT_VARIANT}
					radius={NATIVE_COMPONENT_RADIUS}
					className={styles.button}
					size={'3'}
				>
					ADD USER
				</Button>
			) : null}
		</form>
	);
};
