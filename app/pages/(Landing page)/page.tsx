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

const LandingPage = ({}: TLandingPagesProps) => {
	return <h1>Home</h1>;
};
export default LandingPage;
