// React core
import React, { useState, useEffect } from 'react';
// External modules / Third-party libraries
import { Box, Card, Flex, Grid } from '@radix-ui/themes';
// Local components
// Hooks and utilities
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
// Configuration
import styles from './Dashboard.module.css';

type TLandingPagesProps = {};

const Dashboard = ({}: TLandingPagesProps) => {
	// const { data: session } = useSession();

	return <h1>Home</h1>;
};
export default Dashboard;

{
	/* <Grid columns='4' gap='3' className={styles.container}>
			<Box className={styles.div1}>a </Box>
			<Box className={styles.div2}>b </Box>
			<Box className={styles.div3}>c </Box>
			<Box className={styles.div4}>d </Box>
			<Box className={styles.div5}>e </Box>
			<Box className={styles.div6}>
				test
			</Box>
		</Grid> */
}
