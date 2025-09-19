import type { Preview } from '@storybook/react';
import { Grommet, type ThemeType } from 'grommet';
import { hpe as theme } from 'grommet-theme-hpe';

const hpe: ThemeType = {
  ...theme,
};

type BackgroundType = {
  light?: string;
  dark?: string;
};

const background = hpe.global?.colors?.background as BackgroundType | undefined;

const preview: Preview = {
  decorators: [
    (Story, context) => {
      console.log('context', context.globals);
      let mode: 'light' | 'dark' = 'light';
      if (
        context.globals?.backgrounds?.value ===
        background?.dark
      )
        mode = 'dark';

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
        { name: 'light', value: background?.light },
        { name: 'dark', value: background?.dark },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: 'HPE Icons for use with the HPE Design System',
      },
    },
    options: {
      storySort: {
        order: ['Icons', 'Components', '*'],
      },
    },
  },
};

export default preview;
