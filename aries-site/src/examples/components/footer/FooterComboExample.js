import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext, Text } from 'grommet';
import { FormPrevious, FormNext } from 'grommet-icons';

export const FooterComboExample = () => {
  const size = useContext(ResponsiveContext);
  const year = new Date().getFullYear();
  const footerLinks = [
    { label: 'Terms' },
    { label: 'Privacy' },
    { label: 'Security' },
    { label: 'Feedback' },
  ];

  return (
    <Box gap="medium">
      <Footer fill="horizontal">
        <Button label="Go back" icon={<FormPrevious />} />
        <Button label="Next" icon={<FormNext />} reverse />
      </Footer>
      <Footer
        background="background-front"
        direction={size !== 'small' ? 'row' : 'column'}
        align={size !== 'small' ? 'center' : undefined}
      >
        <Box
          direction={size !== 'small' ? 'row' : 'column'}
          align={size !== 'small' ? 'center' : undefined}
          gap="xsmall"
        >
          <Text size="small">
            &copy; {year} Hewlett Packard Enterprise Development LP
          </Text>
        </Box>
        <Box
          direction="row"
          align={size !== 'small' ? 'center' : undefined}
          gap="xsmall"
          wrap
        >
          {footerLinks.map(link => (
            <Button key={link.label} label={link.label} />
          ))}
        </Box>
      </Footer>
    </Box>
  );
};
