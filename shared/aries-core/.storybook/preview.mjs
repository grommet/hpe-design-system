import React from 'react';
import { Grommet, Box } from 'grommet';
import { hpe as hpeStable } from 'grommet-theme-hpe';
import { hpe as hpeV5 } from 'grommet-theme-hpe-v5';
import { hpe as hpeV6 } from 'grommet-theme-hpe-v6';
import { hpe as hpeV8 } from 'grommet-theme-hpe-v8';
import { useThemePreview } from '@shared/hooks';
import { useIsDarkMode } from './darkModeHooks';

const isStorybookDev = process.env.NODE_ENV !== 'production';
const themeSourceItems = [
  { value: 'v8', title: 'v2 hpe-design-tokens (v8 grommet-theme-hpe)' },
  { value: 'v6', title: 'v1 hpe-design-tokens (v6 grommet-theme-hpe)' },
  { value: 'v5', title: 'v0 hpe-design-tokens (v5 grommet-theme-hpe)' },
  { value: 'stable', title: 'Stable' },
  ...(isStorybookDev ? [{ value: 'local', title: 'Local preview' }] : []),
];

export default {
  globalTypes: {
    themeSource: {
      defaultValue: isStorybookDev ? 'local' : 'v8',
      toolbar: {
        items: themeSourceItems,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = useIsDarkMode();
      const { theme: hpeThemePreview } = useThemePreview();
      const selectedTheme =
        context.globals.themeSource === 'v8'
          ? hpeV8
          : context.globals.themeSource === 'v6'
          ? hpeV6
          : context.globals.themeSource === 'v5'
          ? hpeV5
          : context.globals.themeSource === 'stable'
          ? hpeStable
          : context.globals.themeSource === 'local' && isStorybookDev
          ? hpeThemePreview
          : hpeV8;

      const mode = isDark ? 'dark' : 'light';

      return (
        <Grommet
          theme={selectedTheme}
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
      // Enables the Code panel tab in Storybook Docs for all stories.
      codePanel: true,
      canvas: {
        // Shows the source code tab by default in the Docs canvas for all stories,
        // including both component and pattern stories. Individual stories can
        // override this by setting parameters.docs.canvas.sourceState in their
        // own story or meta definition.
        sourceState: 'shown',
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Welcome', 'Components', 'Patterns'],
      },
    },
  },
};
