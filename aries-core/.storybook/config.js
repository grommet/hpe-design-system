import { addParameters, configure } from '@storybook/react';
import dark from './theme';

// addParameters needs to be called before configure() method or it won’t have any effect.
addParameters({
  options: {
    theme: dark,
    showNav: true,
    showPanel: true, // show the code panel by default
  },
});

configure(require.context('../src/js', true, /stories\/.*\.js$/), module);
