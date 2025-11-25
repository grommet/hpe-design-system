import React from 'react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

export default {
  decorators: [
    (Story, context) => {
      let mode = 'light';
      let theme = hpe;

      // Determine mode based on background
      if (
        context.globals?.backgrounds?.value ===
        hpe.global.colors.background.dark
      ) {
        mode = 'dark';
      }

      // Determine theme based on selection
      if (context.globals?.theme === 'grommet') {
        theme = grommet;
      }

      // Hide stories tagged for specific themes
      if (
        context.tags?.includes('hpe') &&
        context.globals?.theme === 'grommet'
      ) {
        return <div>Story only available in HPE theme</div>;
      }
      if (
        context.tags?.includes('grommet') &&
        context.globals?.theme === 'hpe'
      ) {
        return <div>Story only available in Grommet theme</div>;
      }

      return (
        <Grommet theme={theme} themeMode={mode}>
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
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Select a theme',
      defaultValue: 'hpe',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'hpe', title: 'HPE Theme' },
          { value: 'grommet', title: 'Grommet Theme' },
        ],
      },
    },
  },
};
