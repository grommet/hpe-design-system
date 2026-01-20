import React from 'react';
import { hpe } from 'grommet-theme-hpe';
import { Grommet, Box } from 'grommet';
import { themes } from '@storybook/theming';
// import { withThemeByClassName } from '@storybook/addon-themes';
import { lightTheme, darkTheme, lightStorybookTheme, darkStorybookTheme } from './yourTheme';
import { global, light, dark, components } from 'hpe-design-tokens/grommet';
import { useIsDarkMode } from './darkModeHooks';
import { withThemeByClassName } from '@storybook/addon-themes';
import { withThemeFromGlobals } from '@storybook/addon-themes';

export default {
  decorators: [
    // withThemeByClassName({
    //   themes: {
    //     // Define your light theme class and name
    //     light: lightTheme,
    //     // Define your dark theme class and name
    //     dark: darkTheme,
    //   },
    //   defaultTheme: 'light',
    // }),
    // withThemeFromGlobals({
    //   themes: {
    //     light: lightTheme,
    //     dark: darkTheme,
    //   },
    //   // The key in globalTypes that determines the active theme
    //   defaultTheme: 'light',
    //   // storageKey: 'storybook-theme-storage-key', // Optional: Persist selection
    // }),
    (Story, context) => {
      let mode = 'light';
      const isDarkMode = useIsDarkMode();
      console.log('here', isDarkMode);
      console.log('context.globals ', context.globals);
      // console.log(context.globals);
      if (context.globals?.backgrounds?.value === 'dark') mode = 'dark';
      // console.log('mode ', mode);
      return (
        <Grommet
          theme={hpe}
          themeMode={mode}
          background={
            mode === 'light'
              ? light.hpe.color.background.front
              : dark.hpe.color.background.front
          }
        >
          <Story />
        </Grommet>
      );
    },
  ],
  parameters: {
    toolbar: {
      title: { hidden: true },
      zoom: { hidden: true },
      eject: { hidden: true },
      copy: { hidden: true },
      fullscreen: { hidden: true },
      remount: { hidden: true },
      // measure: { disable: true },
      // outline: { hidden: true },
      grid: { hidden: true },
    },
    measure: { disable: true },
    outline: { disable: true },
    backgrounds: {
      options: {
        light: { name: 'light', value: light.hpe.color.background.front },
        dark: { name: 'dark', value: dark.hpe.color.background.front },
      },
      initialValue: 'light',
    },
    actions: {
      disable: true,
    },
    interactions: {
      disable: true,
    },
    a11y: {
      disable: true,
    },
    controls: {
      disableSaveFromUI: true, // This disables the "Save Story" functionality
    },
    // backgrounds: {
    //   values: [
    //     { name: 'light', value: 'pink' },
    //     { name: 'dark', value: dark.hpe.color.background.front },
    //   ],
    // },
    darkMode: {
      // stylePreview: true,
      // classTarget: 'html',
      dark: {
        ...themes.dark,
        base: 'dark',
        brandTitle: 'HPE Design System Storybook',
        brandUrl: 'https://design-system.hpe.design',
        appBg: '#1A1A2E',
      },
      light: {
        ...themes.normal,
        base: 'light',
        brandTitle: 'HPE Design System Storybook',
        brandUrl: 'https://design-system.hpe.design',
        // brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
        brandTarget: '_self',
        appBg: light.hpe.color.background.default,
        appContentBg: light.hpe.color.background.default,
        appHoverBg: light.hpe.color.background.active,
        // appPreviewBg: 'pink',
        // appBorderRadius: 90,
        fontBase: global.hpe.fontStack.primary,
        // fontCode:
        // colorPrimary: light.hpe.color.brand,
        colorPrimary: 'pink',
        // colorSecondary: 'pink',
        colorSecondary: light.hpe.color.background['primary-strong'],
        textColor: light.hpe.color.text.default,
        textInverseColor: 'pink',
        textMutedColor: light.hpe.color.text.weak,
        barTextColor: light.hpe.color.text.default,
        barSelectedColor: light.hpe.color.text.primary,
        barHoverColor: light.hpe.color.text['primary-hover'],
        // buttonBg: 'orange',
        booleanBg: light.hpe.color.background.default,
        booleanSelectedBg: light.hpe.color.background.active,
        inputTextColor: light.hpe.color.text.default,
        // inputBorder: 'pink',
        inputBorder: light.hpe.color.border.default,
        // inputBorder: components.hpe.formField.default.input.container.rest.borderColor,
        // inputBorder: components.hpe.formField.default.input.borderColor,
        inputBorderRadius:
          components.hpe.formField.default.medium.input.container.borderRadius,
      },
    },
    docs: {
      // Canvas: <Box>here</Box>,
      codePanel: true,
      // theme: {
      //   ...themes.dark,
      //   base: 'dark',
      //   brandTitle: 'HPE Design System Storybook',
      //   brandUrl: 'https://design-system.hpe.design',
      //   appBg: '#1A1A2E',
      // },
    },
    // initialGlobals: {
    //   backgrounds: 'light', // Name of the default background from 'values'
    // },
  },
  // globalTypes: {
  //   theme: {
  //     description: 'Global theme for components',
  //     toolbar: {
  //       // The label to show for this toolbar item
  //       title: 'Theme',
  //       icon: 'circlehollow',
  //       // Array of plain string values or MenuItem shape (see below)
  //       items: ['light', 'dark'],
  //       // Change title based on selected value
  //       dynamicTitle: true,
  //     },
  //   },
  // },
  // initialGlobals: {
  //   theme: 'light',
  // },
};
