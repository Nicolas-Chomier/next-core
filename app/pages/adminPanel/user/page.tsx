'use client';
// React core
import React, { useState } from 'react';
// External modules / Third-party libraries
import { Flex, Heading } from '@radix-ui/themes';
// Local components
import { ChangePasswordForm } from '@/app/components/core/changePasswordForm/ChangePasswordForm';
// Hooks and utilities
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// Configuration
import { API_ROUTES } from '@/config/apiRoutes';
import { DEFAULT_ID_NUMBER } from '@/config/settings';
// Styles
import styles from './AdminPanel.module.css';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
import { Info } from 'lucide-react';

type TNewPasswordTemplate = {
	password: string;
	confirm_password: string;
};

const AdminPanel = () => {
	// SetUp
	const { data: session } = useSession();
	const TOKEN = session?.user?.accessToken || null;
	const USERID = session?.user?.id || DEFAULT_ID_NUMBER;
	const queryClient = useQueryClient();

	// State for message information after CRUD action
	const [actionMessage, setActionMessage] = useState<string | null>(null);

	//- Replace default password by new password
	const handlePatch = (newPassword: TNewPasswordTemplate) => {
		const payload = {
			password: newPassword.password,
			id: USERID,
			token: TOKEN,
		};
		updateMutate(payload);
	};
	const mutationUpdate = useMutation(changePassword, {
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllUser']);
			setActionMessage(`Password changed with success !`);
		},
		onError: (error) => {
			setActionMessage(`${error}`);
		},
	});
	const { mutate: updateMutate } = mutationUpdate;

	// JSX
	return (
		<div className={styles.table_wrapper}>
			<h1>Please change your password</h1>

			<div className={styles.admin_table_wrapper}>
				<div className={styles.admin_table_heading}>
					{actionMessage && <Info className={styles.icon} />}
					{capitalizeFirstLetters(actionMessage)}
				</div>
			</div>

			<ChangePasswordForm handlePatch={handlePatch} />
		</div>
	);
};
export default AdminPanel;

// Mutate and query functions:
//- Function to fetch backend endpoint for delete by id the selected user
type TChangePasswordProps = {
	password: string;
	id: number;
	token: string | null;
};

const changePassword = async (payload: TChangePasswordProps) => {
	const url = `${API_ROUTES.CHANGE_PASSWORD}`;
	const otpions = {
		method: 'PATCH' as const,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + payload.token,
		},
		body: JSON.stringify(payload),
	};
	const response = await fetch(url, otpions);
	if (!response.ok) {
		throw new Error('Error while new password adding');
	}
	return response.json();
};
