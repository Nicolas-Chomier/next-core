'use client';
// React core
import React, { useState, ReactNode } from 'react';
// External modules / Third-party libraries
import { Text } from '@radix-ui/themes';
import { Info } from 'lucide-react';
// Local components
import { AdminTable } from '@/app/components/core/adminTable/AdminTable';
import { LoadingSpinner } from '@/app/components/shared/layout/loadingSpinner/LoadingSpinner';
import { ErrorBox } from '@/app/components/shared/layout/errorBox/ErrorBox';
import { AddUserForm } from '@/app/components/core/addUserForm/AddUserForm';
import { ChangePasswordForm } from '@/app/components/core/changePasswordForm/ChangePasswordForm';
// Hooks and utilities
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import { API_ROUTES } from '@/config/core/apiRoutes';
import {
	DEFAULT_RANK,
	USERS_CONFIG,
	DEFAULT_ID_NUMBER,
} from '@/config/core/settings';
// Styles
import styles from './AccountManagement.module.css';
import { Header } from '@/app/components/shared/layout/header/Header';

type TNewUserTemplate = {
	email: string;
	name: string;
	rank: string;
	password: string;
};

type TNewPasswordTemplate = {
	password: string;
	confirm_password: string;
};

//- Mutate and query functions:
// Function to generate the ADMIN TABLE component
const DisplayUserTable = (handleDelete: (id: number) => void): ReactNode => {
	// Fetch function
	const fetchAllUser = async () => {
		const response = await fetch(API_ROUTES.GET_ALL_USER, {});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	};

	// Query hook
	const { isLoading, isError, data, error } = useQuery(
		['getAllUser'],
		fetchAllUser,
	);

	// JSX
	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError && error instanceof Error) {
		const message = error?.message || 'Unknown error !';
		return <ErrorBox message={message} />;
	}

	return <AdminTable content={data} handleDelete={handleDelete} />;
};

// Function to fetch backend endpoint for delete by id the selected user
type TDeleteUserByIsProps = { id: number; token: string | null };

const deleteUserById = async (payload: TDeleteUserByIsProps) => {
	const url = `${API_ROUTES.DELETE_USER_ID}?id=${payload.id}`;
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + payload.token,
		},
	};
	const response = await fetch(url, options);
	if (!response.ok) {
		throw new Error('Error while deleting');
	}
	return response.json();
};

// Function to fetch backend endpoint to add new user
type TAddNewUserProps = {
	newUser: TNewUserTemplate;
	token: string | null;
};

const addNewUser = async (payload: TAddNewUserProps) => {
	const url = `${API_ROUTES.ADD_USER}`;
	const otpions = {
		method: 'POST' as const,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + payload.token,
		},
		body: JSON.stringify(payload.newUser),
	};
	const response = await fetch(url, otpions);
	if (!response.ok) {
		throw new Error('Error while adding new user');
	}
	return response.json();
};
// Function to fetch backend endpoint for delete by id the selected user
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

const AccountManagement = () => {
	// SetUp
	const { data: session } = useSession();
	const TOKEN = session?.user?.accessToken || null;
	const USERRANK = session?.user?.rank || DEFAULT_RANK;
	const queryClient = useQueryClient();
	const USERID = session?.user?.id || DEFAULT_ID_NUMBER;
	// State for message information after CRUD action
	const [actionMessage, setActionMessage] = useState<string | null>(null);

	// Replace default password by new password
	const handlePatch = (newPassword: TNewPasswordTemplate) => {
		const payload = {
			password: newPassword.password,
			id: USERID,
			token: TOKEN,
		};
		updateMutate(payload);
	};
	// Change password
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

	// Delete given user
	const handleDelete = (id: number) => {
		const payload = { id: id, token: TOKEN };
		deleteMutate(payload);
	};
	const mutationDelete = useMutation(deleteUserById, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['getAllUser']);
			setActionMessage(`User n°${data.userId} deleted with success !`);
		},
		onError: (error) => {
			setActionMessage(`${error}`);
		},
	});
	const { mutate: deleteMutate } = mutationDelete;

	// Add new user to DB
	const handlePost = (newUser: TNewUserTemplate) => {
		const payload = { newUser: newUser, token: TOKEN };
		console.log('from page payload', payload);
		addMutate(payload);
	};
	const mutationAdd = useMutation(addNewUser, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['getAllUser']);
			setActionMessage(`${data.userName} added with success !`);
		},
		onError: (error) => {
			setActionMessage(`${error}`);
		},
	});
	const { mutate: addMutate } = mutationAdd;

	// JSX
	return (
		<div className={styles.table_wrapper}>
			<Header>
				<Text size={'7'}>Administration panel</Text>
			</Header>

			<div className={styles.admin_table_wrapper}>
				<div className={styles.admin_table_heading}>
					{actionMessage && <Info className={styles.icon} />}
					{capitalizeFirstLetters(actionMessage)}
				</div>
				{USERS_CONFIG[USERRANK].administrator &&
					DisplayUserTable(handleDelete)}
			</div>

			{USERS_CONFIG[USERRANK].administrator && (
				<AddUserForm handlePost={handlePost} />
			)}
			{!USERS_CONFIG[USERRANK].administrator && (
				<ChangePasswordForm handlePatch={handlePatch} />
			)}
		</div>
	);
};

export default AccountManagement;