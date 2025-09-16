import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
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
