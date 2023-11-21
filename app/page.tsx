'use client';
// React core
import { signIn } from 'next-auth/react';
// External modules / Third-party libraries
import { Box, Button, Flex } from '@radix-ui/themes';
import { KeyRound } from 'lucide-react';
import { StandardCard } from '@/app/components/core/layout/standardCard/StandardCard';
import { z, ZodType } from 'zod';
// Local components
import { InputText } from '@/app/components/core/inputText/InputText';
// Hooks and utilities
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useForm } from 'react-hook-form';
// Configuration
import { STANDARD_COLOR_SUCCESS } from '@/config/const';
import { DEFAULT_USER, LANDING_FOLDER_PATH } from '@/config/settings';
// Styles
import styles from '@/app/styles/rootPage.module.css';

type TFormData = {
	email: string;
	password: string;
};

const SignInSchema: ZodType<TFormData> = z.object({
	email: z.string().email().min(4, 'Email to short').max(90, 'Email to long'),
	password: z.coerce
		.string()
		.min(3, 'Password to short')
		.max(90, 'Password to long'),
});

const RootPage = () => {
	const {
		setValue,
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors }, //! spinner ?
	} = useForm<TFormData>({
		defaultValues: DEFAULT_USER,
		mode: 'onChange',
		resolver: zodResolver(SignInSchema),
	});

	const submitData = async (data: TFormData) => {
		await signIn('credentials', {
			username: data.email,
			password: data.password,
			redirect: true,
			callbackUrl: LANDING_FOLDER_PATH,
		});
		reset();
	};

	return (
		<main className={styles.container}>
			<div className={styles.title_wrapper}>
				<KeyRound color='whitesmoke' size={'24'} />
				<p className={styles.title}>Bienvenue</p>
			</div>

			<form onSubmit={handleSubmit(submitData)} className={styles.form}>
				<InputText
					type='email'
					label='email'
					placeholder='Votre Email'
					disabled={false}
					register={register}
					setValue={setValue}
					errors={errors}
				/>

				<InputText
					type='password'
					label='password'
					placeholder='Votre Mot de passe'
					disabled={false}
					register={register}
					setValue={setValue}
					errors={errors}
				/>

				<button className={styles.button}>Valider</button>
			</form>
		</main>
	);
};

export default RootPage;
