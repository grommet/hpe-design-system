import React, { useContext } from 'react';
import { Box, Footer, ResponsiveContext, Text } from 'grommet';
import { NavButton } from '../../../components';

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
      direction={size !== 'small' ? 'row' : 'column'}
      align={size !== 'small' ? 'center' : undefined}
    >
      <Box
        direction={size !== 'small' ? 'row' : 'column'}
        align={size !== 'small' ? 'center' : undefined}
        gap='xsmall'
      >
        <Text size="small">
          &copy; 2020 Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
      <Box
        direction='row'
        align={size !== 'small' ? 'center' : undefined}
        gap='xsmall'
      >
        {footerLinks.map(link => (
          <NavButton key={link.label} item={link.label} />
        ))}
      </Box>
    </Footer>
  );
};
