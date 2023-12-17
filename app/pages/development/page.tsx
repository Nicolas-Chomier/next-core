'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { Controller, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { nanoid } from 'nanoid';
import { SelectLargeList } from '@/app/components/shared/selects/largeList/SelectLargeList';
import { Flex } from '@radix-ui/themes';
import { DatePickers } from '@/app/components/shared/dates/DatePickers';
import { FormButton } from '@/app/components/shared/buttons/FormButton';
import { SearchBar } from '@/app/components/shared/search/SearchBar';
import { Header } from '@/app/components/shared/layout/header/Header';

import { Button } from 'vite-scl';

// Générer 10 strings aléatoires
let stringList: any = [];
for (let i = 0; i < 100; i++) {
	stringList.push(`${nanoid(15)}`);
}
//
type TAddUserForm = {
	largeList: any;
	dateRange: any;
	email: any;
	multiple: any;
	basic: any;
};

export const TestSchema: ZodType<TAddUserForm> = z.object({
	largeList: z.string().toLowerCase().trim().min(1),
	multiple: z.array(z.string()),
	basic: z.string().toLowerCase().trim().min(1),
	dateRange: z.tuple([z.date(), z.date()]),
	email: z.string().email().min(4, 'Email to short').max(90, 'Email to long'),
});

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

	const handleSearch = (e: any) => {
		console.log('=====', e);
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
					<Button></Button>
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

					<SearchBar
						data={stringList}
						placeHolder={'Recherche...'}
						onChange={handleSearch}
					></SearchBar>
				</Flex>
			</form>
		</>
	);
};
export default SandBox;
