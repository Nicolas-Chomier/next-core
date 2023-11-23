'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { NavigationBar } from '@/app/components/core/navigation/navigationBar/NavigationBar';
// Hooks and utilities
import { setDarkMode } from '../store/core/darkMode';
// Configuration
// Styles
import '@/app/styles/background.css';
import { Nunito } from 'next/font/google';

const customFont = Nunito({
	subsets: ['latin'],
	weight: '400',
	style: ['normal'],
});

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	const { isDarkMode } = setDarkMode();
	return (
		<main
			className={`${customFont.className} ${
				isDarkMode ? 'dark_background' : 'light_background'
			}`}
		>
			<NavigationBar />
			<div>{children}</div>
		</main>
	);
};
export default LandingLayout;
