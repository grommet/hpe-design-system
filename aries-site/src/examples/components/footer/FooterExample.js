import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext, Text } from 'grommet';

export function FooterExample() {
  const size = useContext(ResponsiveContext);
  const year = new Date().getFullYear();

  const footerLinks = [
    { label: 'Terms' },
    { label: 'Privacy' },
    { label: 'Security' },
    { label: 'Feedback' },
  ];
  return (
    <Footer
      background="background-front"
      direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
      align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
      pad={{ horizontal: 'medium', vertical: 'small' }}
      fill="horizontal"
    >
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
        gap="xsmall"
      >
        <Text size="small">
          &copy; {year} Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
      <Box
        direction="row"
        align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
        gap="xsmall"
        wrap
      >
        {footerLinks.map(link => (
          <Button key={link.label} label={link.label} />
        ))}
      </Box>
    </Footer>
  );
}
