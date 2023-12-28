/* import { create } from 'zustand'; */
import { createDarkModeStore } from '@/app/store/darkMode';

export const useBoundStore = (...state) => ({
	...createDarkModeStore(...state),
});
