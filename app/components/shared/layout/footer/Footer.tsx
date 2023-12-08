// React core
import React from 'react';
// External modules / Third-party libraries
import { Badge } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { usePathname } from 'next/navigation';
// Configuration
import {
	NATIVE_COMPONENT_RADIUS,
	NATIVE_COMPONENT_ACCENTCOLOR,
	NATIVE_COMPONENT_VARIANT,
} from '@/config/constantes';
// Styles
import styles from './Footer.module.css';

export const Footer = () => {
	const pathname = usePathname();
	const pageName = pathname.split('/').at(-1);
	return (
		<Badge
			radius={NATIVE_COMPONENT_RADIUS}
			variant={NATIVE_COMPONENT_VARIANT}
			color={NATIVE_COMPONENT_ACCENTCOLOR}
			className={styles.footer}
		>{`/${pageName}`}</Badge>
	);
};
