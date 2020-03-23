import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext, Text } from 'grommet';

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
      direction="row-responsive"
      align={size !== 'small' ? 'center' : undefined}
    >
      <Box align={size !== 'small' ? 'center' : undefined}>
        <Text size="small">
          &copy; 2020 Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
      <Box direction="row" gap="medium">
        {footerLinks.map((link, index) => (
          <Button
            key={index}
            label={<Text size="small">{link.label}</Text>}
            plain
          />
        ))}
      </Box>
    </Footer>
  );
};
