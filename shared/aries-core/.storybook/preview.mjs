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
