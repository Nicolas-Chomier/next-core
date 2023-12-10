'use client';
// React core
import { signIn } from 'next-auth/react';
// External modules / Third-party libraries
import { ShieldCheck } from 'lucide-react';
// Local components
import { InputText } from '@/app/components/shared/inputs/inputText/InputText';
import { LoadingSpinner } from '@/app/components/shared/layout/loadingSpinner/LoadingSpinner';
// Hooks and utilities
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useForm } from 'react-hook-form';
// Configuration
import { LANDING_PAGE } from '@/config/core/settings';
import { DEFAULT_USER } from '@/config/core/authentication';
import { SignInFormSchema, TSignInForm } from '@/app/utils/schema/signInForm';
// Styles
import styles from '@/app/styles/rootPage.module.css';

const RootPage = () => {
	const {
		setValue,
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<TSignInForm>({
		defaultValues: DEFAULT_USER,
		mode: 'onChange',
		resolver: zodResolver(SignInFormSchema),
	});

	const submitData = async (data: TSignInForm) => {
		await signIn('credentials', {
			username: data.email,
			password: data.password,
			redirect: true,
			callbackUrl: LANDING_PAGE,
		});
		reset();
	};

	return (
		<main className={styles.container}>
			<form onSubmit={handleSubmit(submitData)} className={styles.form}>
				<div className={styles.title_wrapper}>
					<ShieldCheck color='whitesmoke' size={'32'} />
					<p className={styles.title}>Bienvenue</p>
				</div>
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

				<div className={styles.button_wrapper}>
					{isSubmitting ? (
						<LoadingSpinner color={'white'} />
					) : (
						<button type='submit' className={styles.button}>
							Valider
						</button>
					)}
				</div>
			</form>
		</main>
	);
};

export default RootPage;
