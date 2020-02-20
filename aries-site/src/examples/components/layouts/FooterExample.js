import React, { useContext } from 'react';
import { NavLink } from 'aries-core';
import { Box, Footer, ResponsiveContext, Text } from 'grommet';

export const FooterExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Footer 
      background="background-front"
      direction={size !== 'small' ? 'row' : 'column-reverse'}
      pad={{
        vertical: size !== 'small' ? 'small' : 'large',
        // Match horizontal padding of aries-core Nav
        horizontal: size !== 'small' ? 'medium' : 'large',
      }}
      align={size !== 'small' ? 'center' : undefined}
    >
      <Box
        direction={size !== 'small' ? 'row' : 'column'}
        align={size !== 'small' ? 'center' : undefined}
        gap={size !== 'small' ? 'medium' : undefined}
      >
        <Text size="small">
          &copy; 2020 Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
      <Box alignSelf="center" direction="row" gap="medium">
        <NavLink label="Terms" />
        <NavLink label="Privacy" />
        <NavLink label="Security" />
        <NavLink label="Feedback" />
      </Box>
    </Footer>
  );
};
