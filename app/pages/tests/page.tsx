'use client';
// React core
import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
// Local components
import { SelectMultiple } from '@/app/components/shared/selects/largeList/SelectMultiple';
// Hooks and utilities
import { Controller, useForm } from 'react-hook-form';
// Configuration
import { ZodType, z } from 'zod';
import { nanoid } from 'nanoid';
import { SelectLargeList } from '@/app/components/shared/selects/largeList/SelectLargeList';
import { Flex } from '@radix-ui/themes';

import { SelectBasic } from '@/app/components/shared/selects/basic/SelectBasic';

import { InputText } from '@/app/components/shared/inputs/inputText/InputText';
import { DatePickers } from '@/app/components/shared/dates/DatePickers';
import { FormButton } from '@/app/components/shared/buttons/FormButton';

// Générer 10 strings aléatoires
let stringList: any = [];
for (let i = 0; i < 100; i++) {
	stringList.push(`${nanoid(15)}`);
}

/* let stringList2: any = [];
for (let i = 0; i < 8; i++) {
	stringList2.push(`${nanoid(9)}`);
} */
//
type TAddUserForm = {
	largeList: any;
	/* multiple: any;
	basic: any; */
	dateRange: any;
	/*email: any; */
	/* dates: any;
	startDate: any;
	endDate: any; */
};

export const TestSchema: ZodType<TAddUserForm> = z.object({
	largeList: z.string().toLowerCase().trim().min(1),
	/* multiple: z.array(z.string()),
	basic: z.string().toLowerCase().trim().min(1), */
	dateRange: z.tuple([z.date(), z.date()]),
	/*email: z.string().email().min(4, 'Email to short').max(90, 'Email to long'),

	startDate: z.coerce
		.date()
		.min(MINIMUM_ALLOWED_DATE, { message: 'Too old' }),
	endDate: z.coerce.date(),
	 */
});

type TAddUserFormProps = {
	handlePost: (obj: TAddUserForm) => void;
};

const SandBox = () => {
	const {
		setValue,
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors, isValid, isLoading },
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
			<form onSubmit={handleSubmit(submitData)}>
				<Flex
					direction={'column'}
					align={'center'}
					justify={'between'}
					gap={'4'}
				>
					<Controller
						control={control}
						name='largeList'
						render={({ field }) => (
							<SelectLargeList
								field={field}
								contentToDisplay={stringList}
							/>
						)}
					/>

					{/* 	<Controller
						control={control}
						name='multiple'
						render={({ field }) => (
							<SelectMultiple
								field={field}
								contentToDisplay={stringList}
							/>
						)}
					/>

					<Controller
						control={control}
						name='basic'
						render={({ field }) => (
							<SelectBasic
								field={field}
								contentToDisplay={stringList}
							></SelectBasic>
						)}
					/> */}

					{/*	<InputText
						type='email'
						label='email'
						placeholder='Email...'
						disabled={false}
						register={register}
						setValue={setValue}
						errors={errors}
					/> */}

					<Controller
						control={control}
						name='dateRange'
						render={({ field }) => <DatePickers field={field} />}
					/>

					<FormButton display={isValid} isLoading={isLoading} />
				</Flex>
			</form>
		</>
	);
};
export default SandBox;
