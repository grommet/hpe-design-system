import React from 'react';
import { Box, Header, Heading } from 'grommet';
import { skeleton as skeletonAnimation } from '../utils/animation';

export const ContentPane = ({
  actions,
  children,
  contain,
  heading,
  level,
  skeleton,
  ...rest
}: {
  actions?: React.ReactNode;
  children: React.ReactNode;
  contain: boolean;
  heading: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  skeleton: boolean;
}) => {
  return (
    <Box
      background={contain ? 'background-front' : undefined}
      gap="medium"
      pad={contain ? { horizontal: 'medium', vertical: 'medium' } : undefined}
      round={contain}
      {...rest}
    >
      <Header>
        <Heading level={level} margin="none">{heading}</Heading>
        {actions}
      </Header>
      <Box skeleton={skeleton ? skeletonAnimation : undefined}>
        {children}
      </Box>
    </Box>
  );
};