import React, { useContext } from 'react';
import { FooterLink } from 'aries-core';
import { Box, Footer as GrommetFooter, ResponsiveContext, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export const Footer = () => {
  const size = useContext(ResponsiveContext);
  return (
    <GrommetFooter
      direction={size !== 'small' ? 'row' : 'column'}
      pad={{
        vertical: size !== 'small' ? 'small' : 'large',
        // Match horizontal padding of aries-core Nav
        horizontal: size !== 'small' ? 'xlarge' : 'large',
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
        <FooterLink label="Terms" href="#" />
        <FooterLink label="Privacy" href="#" />
        <FooterLink label="Security" href="#" />
        <FooterLink
          label="Feedback"
          href="https://github.com/hpe-design/aries/issues"
          target="_blank"
          rel="noreferrer noopener"
        />
      </Box>
    </GrommetFooter>
  );
};
