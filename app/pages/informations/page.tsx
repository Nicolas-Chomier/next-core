'use client';
// React core

import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
// Local components
import { LargeListMultiSelect } from '@/app/components/largeListMultiSelect/LargeListMultiSelect';
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
// Configuration
import { ZodType, z } from 'zod';
import { nanoid } from 'nanoid';

// Générer 10 strings aléatoires
let stringList: any = [];
for (let i = 0; i < 15; i++) {
	stringList.push(`${nanoid(8)}`);
}

type TAddUserForm = {
	test: any;
};

export const TestSchema: ZodType<TAddUserForm> = z.object({
	//test: z.string().toLowerCase().trim().min(1),
	test: z.array(z.string()),
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
	console.log(errors);
	// Send Data to page component above and reset form
	const submitData = async (data: TAddUserForm) => {
		//handlePost(data);
		console.log(data);

		reset();
	};

	const resetField = () => {
		setValue('test', []); // Réinitialise le champ avec un tableau vide
	};

	return (
		<>
			<h1>Infos</h1>

			<form onSubmit={handleSubmit(submitData)}>
				<Controller
					control={control}
					name='test'
					render={({ field }) => (
						<LargeListMultiSelect
							field={field}
							contentToDisplay={stringList}
						/>
					)}
				/>

				<button type='submit'>Soumettre</button>
			</form>
		</>
	);
};
export default Informations;
