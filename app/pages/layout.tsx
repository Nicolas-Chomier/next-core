'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
import { NavigationBar } from '@/app/components/core/navigation/navigationBar/NavigationBar';
import { Footer } from '@/app/components/core/footer/Footer';
// Hooks and utilities
import { setDarkMode } from '../store/core/darkMode';
// Configuration
// Styles
import '@/app/styles/backGround.css';
import { Quicksand } from 'next/font/google';

const customFont = Quicksand({
	subsets: ['latin'],
	weight: '500',
	style: ['normal'],
});

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	const { isDarkMode } = setDarkMode();
	return (
		<main
			className={`${
				isDarkMode ? 'dark_background' : 'light_background'
			} ${customFont.className}`}
		>
			<NavigationBar />
			<div>{children}</div>
			<Footer />
		</main>
	);
};
export default LandingLayout;
