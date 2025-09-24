import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { Bold, Italic, Underline } from 'grommet-icons';

const options = [
  {
    icon: <Bold a11yTitle="Bold" />,
    value: 'bold',
    tip: 'Bold',
  },
  {
    icon: <Italic a11yTitle="Italic" />,
    value: 'italic',
    tip: 'Italic',
  },
  {
    icon: <Underline a11yTitle="Underline" />,
    value: 'underline',
    tip: 'Underline',
  },
];

export const ToggleGroupTextEditor = () => (
  <Box pad="xlarge">
    <ToggleGroup a11yTitle="Format text" options={options} multiple />
  </Box>
);
