import React from 'react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet, Box } from 'grommet';
import { useIsDarkMode } from './darkModeHooks';

export default {
  decorators: [
    (Story, context) => {
      const isDark = useIsDarkMode();

      const mode = isDark ? 'dark' : 'light';

      return (
        <Grommet
          theme={hpe}
          themeMode={mode}
          background={
            context.parameters.background || context.globals.background?.value
          }
          full={context.parameters.full || 'min'}
        >
          {context.parameters.layout === 'fullscreen' ? (
            <Story />
          ) : (
            <Box pad="large" fill>
              <Story />
            </Box>
          )}
        </Grommet>
      );
    },
  ],
  parameters: {
    layout: 'centered',
    actions: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
    controls: {
      disableSaveFromUI: true,
    },
    docs: {
      codePanel: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', 'Components', 'Patterns'],
      },
    },
  },
};
