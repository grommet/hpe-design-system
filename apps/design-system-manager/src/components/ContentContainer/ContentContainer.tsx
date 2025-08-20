import type { ReactNode } from 'react';
import { Box, type BoxExtendedProps } from 'grommet';

interface ContentContainerProps extends BoxExtendedProps {
  children: ReactNode;
}

export const ContentContainer = ({
	children,
	...rest
}: ContentContainerProps) => {
	return (
		<Box
			background="background-front"
      pad={{ horizontal: 'medium', vertical: 'small' }}
			round="small"
			{...rest}
		>
			{children}
		</Box>
	);
};
