import React from 'react';
import { hpe } from 'grommet-theme-hpe';

export default {
  decorators: [
    (Story, context) => {
      let mode = 'light';
      if (
        context.globals?.backgrounds?.value ===
        hpe.global.colors.background.dark
      ) {
        mode = 'dark';
      }

      return (
        <Grommet theme={hpe} themeMode={mode}>
          <Story />
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
