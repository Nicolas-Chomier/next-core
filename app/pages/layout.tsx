'use client';
// React core
import React from 'react';
// External modules / Third-party libraries
// Local components
// import { NavigationBar } from '@/app/components/core/navigation/navigationBar/NavigationBar';
import { SideBar } from '@/app/components/core/sideBar/SideBar';
import { Footer } from '@/app/components/shared/layout/footer/Footer';
// Hooks and utilities
import { setDarkMode } from '../store/core/darkMode';
// Configuration
// Styles
import '@/app/styles/backGround.css';
// Fonts

//import { Quicksand } from 'next/font/google';
/* const customFont = Quicksand({
	subsets: ['latin'],
	weight: '500',
	style: ['normal'],
}); */

/* import { Signika_Negative } from 'next/font/google';
const customFont = Signika_Negative({
	subsets: ['latin'],
	weight: '300',
	style: ['normal'],
}); */

import { Plus_Jakarta_Sans } from 'next/font/google';

const customFont = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: '400',
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
			{/* <NavigationBar /> */}
			<SideBar></SideBar>
			<div>{children}</div>
			<Footer />
		</main>
	);
};
export default LandingLayout;
