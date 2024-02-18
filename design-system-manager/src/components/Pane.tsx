import React from 'react';
import { Box, Header, Heading } from 'grommet';
import type { LevelType } from '@/utilities/types';

export const Pane = ({
  children, 
  heading, 
  level,
  skeleton,
  ...boxProps
}: {
  children: React.ReactNode, 
  heading: string | React.ReactNode, 
  level: LevelType,
  skeleton?: boolean,
} ) => {
  return (
    <Box 
      background="background-front" 
      gap='medium' 
      pad={{horizontal: 'medium', top: 'medium', bottom: 'large'}} 
      round
      {...boxProps}
    >
      <Header>
        <Heading level={level}>{heading}</Heading>
      </Header>
      <Box skeleton={skeleton}>
        {children}
      </Box>
    </Box>
  );
}