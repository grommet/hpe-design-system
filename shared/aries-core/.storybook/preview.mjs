import React from 'react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet } from 'grommet';
import { useIsDarkMode } from './darkModeHooks';

export default {
  decorators: [
    (Story, context) => {
      const isDark = useIsDarkMode();

      const mode = isDark ? 'dark' : 'light';

      return (
        <Grommet full theme={hpe} themeMode={mode}>
          <Story />
        </Grommet>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      values: [
        { name: 'light', value: hpe.global.colors.background.light },
        { name: 'dark', value: hpe.global.colors.background.dark },
      ],
    },
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
