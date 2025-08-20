import { Box, type BoxProps } from 'grommet';

export const AppBody: React.FC<React.PropsWithChildren<BoxProps>> = ({
	children,
	...rest
}) => {
	return (
		<Box background="background-back" round={{corner: 'top-left', size: 'small'}} {...rest}>
			{children}
		</Box>
	);
};
