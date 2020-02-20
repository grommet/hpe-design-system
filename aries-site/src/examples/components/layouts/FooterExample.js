import React, { useContext } from 'react';
import { FooterLink } from 'aries-core';
import { Box, Footer, ResponsiveContext, Text } from 'grommet';

export const FooterExample = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Footer 
      background="background-front"
      direction={size !== 'small' ? 'row-reverse' : 'column-reverse'}
      pad={{
        vertical: size !== 'small' ? 'small' : 'large',
        // Match horizontal padding of aries-core Nav
        horizontal: size !== 'small' ? 'medium' : 'large',
      }}
      align={size !== 'small' ? 'center' : undefined}
    >
      <Box alignSelf="center" direction="row" gap="medium">
        <FooterLink label="Terms" />
        <FooterLink label="Privacy" />
        <FooterLink label="Security" />
        <FooterLink label="Feedback" />
      </Box>
      <Box
        direction={size !== 'small' ? 'row' : 'column'}
        align={size !== 'small' ? 'center' : undefined}
        gap={size !== 'small' ? 'xlarge' : undefined}
      >
        <Text size="small">
          &copy; 2020 Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
    </Footer>
  );
};
