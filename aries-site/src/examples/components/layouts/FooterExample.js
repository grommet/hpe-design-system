import React, { useContext } from 'react';
import { FooterLink } from 'aries-core';
import { Box, Footer, ResponsiveContext, Text } from 'grommet';

export const FooterExample = () => {
  const size = useContext(ResponsiveContext);

  const footerLinks = [
    { label: 'Terms' },
    { label: 'Privacy' },
    { label: 'Security' },
    { label: 'Feedback' },
  ];
  return (
    <Footer
      background="background-front"
      direction={size !== 'small' ? 'row' : 'column-reverse'}
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
        {footerLinks.map((link, index) => (
          <FooterLink key={index} label={link.label} />
        ))}
      </Box>
    </Footer>
  );
};
