import React from 'react';
import { Box, Meter } from 'grommet';

const meta = {
  title: 'Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
  },
  tags: ['hpe'],
};

export default meta;

export const MeterStorybookExample = {
  render: () => (
    <Box align="center" pad="large">
      <Meter
        type="pie"
        background="light-2"
        size="small"
        values={[{ value: 70 }, { value: 20 }, { value: 10 }]}
      />
    </Box>
  ),
  parameters: {
    docs: {
      codePanel: true,
    },
  },
};
