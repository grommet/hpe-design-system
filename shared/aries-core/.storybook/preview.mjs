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
        <Grommet
          full
          theme={hpe}
          themeMode={mode}
          background={context.globals.background?.value}
        >
          <Story />
        </Grommet>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
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
        order: [
          'Components',
          [
            'Accordion',
            'Anchor',
            'Avatar',
            'Box',
            'Button',
            'Card',
            'CheckBox',
            'CheckBoxGroup',
            'Data',
            'DateInput',
            '*',
          ],
        ],
      },
    },
  },
};
