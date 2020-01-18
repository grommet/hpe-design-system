import React, { useContext } from 'react';
import { FooterLink } from 'aries-core';
import { Box, Footer, ResponsiveContext, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export const FooterExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Footer
      background="background-front"
      direction={size !== 'small' ? 'row' : 'column'}
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
        <Hpe size="large" color="brand" />
        <Text size="small">&copy; 2020 Hewlett Packard Enterprise</Text>
      </Box>
      <Box direction="row" gap="medium">
        <FooterLink label="Terms" />
        <FooterLink label="Privacy" />
        <FooterLink label="Security" />
        <FooterLink label="Feedback" />
      </Box>
    </Footer>
  );
};
