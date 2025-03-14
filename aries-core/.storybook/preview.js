import React from 'react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet, Box } from 'grommet';

export default {
  decorators: [
    (Story, context) => {
      let mode = 'light';
      if (
        context.globals?.backgrounds?.value ===
        hpe.global.colors.background.dark
      )
        mode = 'dark';

      return (
        <Grommet theme={hpe} themeMode={mode}>
          <Box pad="xsmall">
            <Story />
          </Box>
        </Grommet>
      );
    },
  ],
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: hpe.global.colors.background.light },
        { name: 'dark', value: hpe.global.colors.background.dark },
      ],
    },
  },
};
