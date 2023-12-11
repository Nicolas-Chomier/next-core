'use client';
// External modules / Third-party libraries
import { Theme } from '@radix-ui/themes';
import { AuthProvider } from '@/app/components/core/provider/AuthProvider';
// Hooks and utilities
import { setDarkMode } from '@/app/store/darkMode';
import QueryProvider from './components/core/provider/QueryProvider';
// Configuration
import {
	LANGUAGE,
	THEME_ACCENTCOLOR,
	THEME_GRAYCOLOR,
	THEME_PANELBACKGROUND,
	THEME_SCALING,
} from '@/config/constantes';
// Styles
import '@radix-ui/themes/styles.css';
import './styles/globals.css';
import './styles/variables.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isDarkMode } = setDarkMode();

	return (
		<html lang={LANGUAGE} suppressHydrationWarning>
			<body>
				<Theme
					appearance={isDarkMode ? 'dark' : 'light'}
					accentColor={THEME_ACCENTCOLOR}
					grayColor={THEME_GRAYCOLOR}
					panelBackground={THEME_PANELBACKGROUND}
					scaling={THEME_SCALING}
				>
					<AuthProvider>
						<QueryProvider>{children}</QueryProvider>
					</AuthProvider>
				</Theme>
			</body>
		</html>
	);
}
