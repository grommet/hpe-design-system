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
          full
          theme={hpe}
          themeMode={mode}
          background={context.globals.background?.value}
        >
          <Box pad="large" fill>
            <Story />
          </Box>
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
  },
};
