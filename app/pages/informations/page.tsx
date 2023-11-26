'use client';
// React core
import { LargeListSelect } from '@/app/components/largeListSelect/LargeListSelect';
import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
// Local components
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
// Configuration
import { ZodType, z } from 'zod';
import { nanoid } from 'nanoid';
import { CustomCard } from '@/app/components/core/layout/customCard/CustomCard';
import { Card } from '@radix-ui/themes';

// Générer 10 strings aléatoires
let stringList: any = [];
for (let i = 0; i < 8; i++) {
	stringList.push(`${nanoid(8)}`);
}

type TAddUserForm = {
	test: any;
};

export const TestSchema: ZodType<TAddUserForm> = z.object({
	test: z.string().toLowerCase().trim().min(1),
});

type TAddUserFormProps = {
	handlePost: (obj: TAddUserForm) => void;
};

const Informations = () => {
	const {
		setValue,
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid },
	} = useForm<TAddUserForm>({
		mode: 'onChange',
		resolver: zodResolver(TestSchema),
	});

	// Send Data to page component above and reset form
	const submitData = async (data: TAddUserForm) => {
		//handlePost(data);
		console.log(data);
		reset();
	};

	return (
		<>
			<h1>Infos</h1>

			<form onSubmit={handleSubmit(submitData)}>
				<LargeListSelect
					label={'test'}
					itemList={stringList}
					control={control}
				/>

				<button type='submit'>Soumettre</button>
			</form>
		</>
	);
};
export default Informations;
