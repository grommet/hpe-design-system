import React from 'react';
import { Footer, Text, Box, Button } from 'grommet';
import { boxArgs } from '../utils/commonArgs';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    background: { ...boxArgs.background },
    gap: { ...boxArgs.gap },
    fill: { ...boxArgs.fill },
    height: { ...boxArgs.height },
    pad: { ...boxArgs.pad },
    width: { ...boxArgs.width },
  },
};

export default meta;

export const BasicFooter = {
  render: args => {
    const year = new Date().getFullYear();
    const footerLinks = [
      { label: 'Terms' },
      { label: 'Privacy' },
      { label: 'Security' },
      { label: 'Feedback' },
    ];
    return (
      <Footer {...args}>
        <Box gap="3xsmall">
          <Text size="small">
            &copy; {year} Hewlett Packard Enterprise Development LP
          </Text>
        </Box>
        <Box direction="row" gap="3xsmall" wrap>
          {footerLinks.map(link => (
            <Button key={link.label} label={link.label} />
          ))}
        </Box>
      </Footer>
    );
  },
  args: {
    background: 'background-contrast',
    pad: 'medium',
  },
  name: 'Footer',
};
