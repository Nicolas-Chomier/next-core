'use client';
// React core
import React, { useState, ReactNode } from 'react';
// External modules / Third-party libraries
import { Info } from 'lucide-react';
// Local components
import { AdminTable } from '@/app/components/core/adminTable/AdminTable';
import { LoadingSpinner } from '@/app/components/core/layout/loadingSpinner/LoadingSpinner';
import { ErrorBox } from '@/app/components/core/layout/errorBox/ErrorBox';
import { AddUserForm } from '@/app/components/core/addUserForm/AddUserForm';
// Hooks and utilities
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { capitalizeFirstLetters } from '@/app/utils/core/capitalizeFirstLetters';
// Configuration
import { API_ROUTES } from '@/config/core/app_routes';
import { DEFAULT_RANK } from '@/config/core/app_settings';
// Styles
import styles from '@/app/pages/adminPanel/AdminPanel.module.css';
import LargeList from '@/app/components/shared/select/largeList/SelectLargeList';

type TNewUserTemplate = {
	email: string;
	name: string;
	rank: string;
	password: string;
};

const AdminPanel = () => {
	// SetUp
	const { data: session } = useSession();
	const TOKEN = session?.user?.accessToken || null;
	const USERRANK = session?.user?.rank || DEFAULT_RANK;
	const queryClient = useQueryClient();

	// State for message information after CRUD action
	const [actionMessage, setActionMessage] = useState<string | null>(null);

	//- Delete given user
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

	//- Add new user to DB
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
			<h1>{`Administration panel (${USERRANK} privileges)`}</h1>

			<div className={styles.admin_table_wrapper}>
				<div className={styles.admin_table_heading}>
					{actionMessage && <Info className={styles.icon} />}
					{capitalizeFirstLetters(actionMessage)}
				</div>
				{DisplayUserTable(handleDelete)}
			</div>

			<AddUserForm handlePost={handlePost} />
		</div>
	);
};
export default AdminPanel;

// Mutate and query functions:
//- Function to generate the ADMIN TABLE component
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

//- Function to fetch backend endpoint for delete by id the selected user
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

//- Function to fetch backend endpoint to add new user
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
