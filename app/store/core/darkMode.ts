import { create } from 'zustand';

type TDarkModeState = {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
};

export const setDarkMode = create<TDarkModeState>((set) => ({
	isDarkMode: false,
	toggleDarkMode: () =>
		set((state) => ({
			isDarkMode: !state.isDarkMode,
		})),
}));
