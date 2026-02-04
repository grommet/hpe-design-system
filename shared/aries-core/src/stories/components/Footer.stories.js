import React from 'react';
import { Footer, Text, Box, Button } from 'grommet';
import {
  backgroundArg,
  padArg,
  alignArg,
  borderArg,
  directionArg,
  heightArg,
  widthArg,
  skeletonArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  argTypes: {
    background: backgroundArg,
    pad: padArg,
    align: alignArg,
    border: borderArg,
    direction: directionArg,
    height: heightArg,
    width: widthArg,
    skeleton: skeletonArg,
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
        <Text size="small">
          &copy; {year} Hewlett Packard Enterprise Development LP
        </Text>
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
