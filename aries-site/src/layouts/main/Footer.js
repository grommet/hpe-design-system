import React, { useContext } from 'react';
import { Box, Heading, Paragraph, ResponsiveContext } from 'grommet';
import { ThemeModeToggle } from '../../components';

export const Footer = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box fill="horizontal" background="background-back">
      <Box fill="horizontal" pad={size !== 'small' ? 'xlarge' : 'large'}>
        <Heading margin="none">Toggling Themes</Heading>
        <Paragraph size="xlarge" fill>
          The HPE Design System is created to cater to both light and dark
          modes.
        </Paragraph>
        <ThemeModeToggle />
      </Box>
    </Box>
  );
};
