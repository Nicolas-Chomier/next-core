'use client';
// React core
import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
// Local components
import { LargeListSelect_multi } from '@/app/components/largeListSelect/LargeListSelect_multi';
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
// Configuration
import { ZodType, z } from 'zod';
import { nanoid } from 'nanoid';
import { LargeListSelect_simple } from '@/app/components/largeListSelect/LargeListSelect_simple';
import { Flex } from '@radix-ui/themes';

// Générer 10 strings aléatoires
let stringList: any = [];
for (let i = 0; i < 15; i++) {
	stringList.push(`${nanoid(8)}`);
}

type TAddUserForm = {
	test0: any;
	test: any;
};

export const TestSchema: ZodType<TAddUserForm> = z.object({
	test0: z.string().toLowerCase().trim().min(1),
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
				<Flex
					direction={'column'}
					align={'center'}
					justify={'between'}
					gap={'9'}
				>
					<Controller
						control={control}
						name='test0'
						render={({ field }) => (
							<LargeListSelect_simple
								field={field}
								contentToDisplay={stringList}
							/>
						)}
					/>
					<Controller
						control={control}
						name='test'
						render={({ field }) => (
							<LargeListSelect_multi
								field={field}
								contentToDisplay={stringList}
							/>
						)}
					/>
					<button>Soumettre</button>
				</Flex>
			</form>
		</>
	);
};
export default Informations;
