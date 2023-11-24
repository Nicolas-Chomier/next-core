//* Server component *//
// React core
// External modules / Third-party libraries
import { Text, Card, Flex } from '@radix-ui/themes';
// Local components
// Hooks and utilities
// Configuration
import { STANDARD_COLOR_DANGER } from '@/config/constantes';

export const ErrorBox = ({ message }: any) => {
	return (
		<Card>
			<Flex align={'center'} justify={'center'}>
				<Text color={STANDARD_COLOR_DANGER} size={'3'}>
					{message}
				</Text>
			</Flex>
		</Card>
	);
};
