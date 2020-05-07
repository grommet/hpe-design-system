import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext, Text } from 'grommet';
import { FormPrevious, FormNext } from 'grommet-icons';

// https://github.com/hpe-design/design-system/blob/master/aries-site/src/components/button/NavButton.js
import { NavButton } from '../../../components';

export const FooterComboExample = () => {
  const size = useContext(ResponsiveContext);

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
            &copy; 2020 Hewlett Packard Enterprise Development LP
          </Text>
        </Box>
        <Box
          direction="row"
          align={size !== 'small' ? 'center' : undefined}
          gap="xsmall"
          wrap
        >
          {footerLinks.map(link => (
            <NavButton key={link.label} item={link.label} />
          ))}
        </Box>
      </Footer>
    </Box>
  );
};
