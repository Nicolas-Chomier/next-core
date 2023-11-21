// React core
import React from 'react';
// External modules / Third-party libraries
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
// Local components
import { InputText } from '@/app/components/core/inputText/InputText';
import { StandardCard } from '@/app/components/core/layout/standardCard/StandardCard';
// Hooks and utilities
import { useForm } from 'react-hook-form';
import { Box, Button, Flex } from '@radix-ui/themes';
import { ChangePasswordSchema } from '@/app/utils/schema/changePasswordForm';
// Configuration
import {
	STANDARD_COLOR_SUCCESS,
	NATIVE_COMPONENT_VARIANT,
	NATIVE_COMPONENT_RADIUS,
} from '@/config/const';

type TChangePasswordFormProps = {
	handlePatch: (obj: TChangePassword) => void;
};

type TChangePassword = {
	password: string;
	confirm_password: string;
};

export const ChangePasswordForm = ({
	handlePatch,
}: TChangePasswordFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<TChangePassword>({
		mode: 'onChange',
		resolver: zodResolver(ChangePasswordSchema),
	});

	// Send Data to page component above and reset form  //! crypter les password
	const submitData = async (data: TChangePassword) => {
		console.log(data);
		handlePatch(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(submitData)}>
			<Flex
				gap='4'
				direction={'column'}
				align={'center'}
				justify={'center'}
			>
				<Flex gap='4' align={'center'} justify={'start'}>
					<StandardCard>
						<InputText
							type='password'
							label='password'
							placeholder='Password...'
							disabled={false}
							register={register}
							errors={errors}
						/>
					</StandardCard>

					<StandardCard>
						<InputText
							type='password'
							label='confirm_password'
							placeholder='Comfirm...'
							disabled={false}
							register={register}
							errors={errors}
						/>
					</StandardCard>
				</Flex>

				<Box /* className={styles.form_box} */>
					{isValid ? (
						<Button
							/* className={styles.valid_form_button} */
							color={STANDARD_COLOR_SUCCESS}
							variant={NATIVE_COMPONENT_VARIANT}
							radius={NATIVE_COMPONENT_RADIUS}
						>
							Change password
						</Button>
					) : null}
				</Box>
			</Flex>
		</form>
	);
};
