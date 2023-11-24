// React core
import React from 'react';
// External modules / Third-party libraries
import { Card } from '@radix-ui/themes';
// Local components
// Hooks and utilities
// Configuration
import { NATIVE_COMPONENT_PX_RADIUS } from '@/config/constantes';
// Styles
// import styles from './StandardCard.module.css';

type CustomCardProps = {
	children: React.ReactNode;
};

export const CustomCard = (props: CustomCardProps) => {
	return (
		<Card style={{ borderRadius: NATIVE_COMPONENT_PX_RADIUS }}>
			{props.children}
		</Card>
	);
};
