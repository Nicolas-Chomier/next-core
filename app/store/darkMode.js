/* import { create } from 'zustand'; */

// Define the state and actions for the dark mode store
/* type DarkModeState = {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}; */

/* export const createDarkModeStore = create<DarkModeState>((set) => ({
	isDarkMode: false,
	toggleDarkMode: () =>
		set((state) => ({
			isDarkMode: !state.isDarkMode,
		})),
}));
 */
export const createDarkModeStore = (set) => ({
	isDarkMode: false,
	toggleDarkMode: () =>
		set((state) => ({
			isDarkMode: !state.isDarkMode,
		})),
});
