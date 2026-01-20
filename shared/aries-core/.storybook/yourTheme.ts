import { create } from 'storybook/theming/create';
// import { useGlobals } from 'storybook/manager-api';
// import { addons } from '@storybook/manager-api';
import { global, light, dark, components } from 'hpe-design-tokens/grommet';
// import { themes } from '@storybook/theming';

// console.log(light.hpe.color.decorative.brand);

// const [globals, updateGlobals] = useGlobals();

export const lightStorybookTheme = create({
  // light: {
  // ...themes.normal,
  base: 'light',
  brandTitle: 'HPE Design System Storybook',
  brandUrl: 'https://design-system.hpe.design',
  // brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
  // brandTarget: '_self',
  // appBg: light.hpe.color.background.default,
  // appContentBg: light.hpe.color.background.default,
  // appHoverBg: light.hpe.color.background.active,
  // // appPreviewBg: 'pink',
  // // appBorderRadius: 90,
  // fontBase: global.hpe.fontStack.primary,
  // // fontCode:
  // // colorPrimary: light.hpe.color.brand,
  // colorPrimary: 'pink',
  // // colorSecondary: 'pink',
  // colorSecondary: light.hpe.color.background['primary-strong'],
  // textColor: light.hpe.color.text.default,
  // textInverseColor: 'pink',
  // textMutedColor: light.hpe.color.text.weak,
  // barTextColor: light.hpe.color.text.default,
  // barSelectedColor: light.hpe.color.text.primary,
  // barHoverColor: light.hpe.color.text['primary-hover'],
  // // buttonBg: 'orange',
  // booleanBg: light.hpe.color.background.default,
  // booleanSelectedBg: light.hpe.color.background.active,
  // inputTextColor: light.hpe.color.text.default,
  // // inputBorder: 'pink',
  // inputBorder: light.hpe.color.border.default,
  // // inputBorder: components.hpe.formField.default.input.container.rest.borderColor,
  // // inputBorder: components.hpe.formField.default.input.borderColor,
  // inputBorderRadius:
  //   components.hpe.formField.default.medium.input.container.borderRadius,
  // },
});

export const darkStorybookTheme = create({
  base: 'dark',
  brandTitle: 'HPE Design System Storybook',
  brandUrl: 'https://design-system.hpe.design',
  appBg: '#1A1A2E',
  // ...other customizations
});

export const lightTheme = create({
  base: 'light',
  // ... other theme properties (textColor, appBg, etc.)
});

export const darkTheme = create({
  base: 'dark',
  // ... other theme properties
});

// export const themes = {
//   light: lightStorybookTheme,
//   dark: darkStorybookTheme,
// };

// const themeOption =
//   globals?.theme === 'light' ? lightStorybookTheme : darkStorybookTheme;

// export const createStorybookTheme = themeMode => {
//   console.log('themeMode:', themeMode);
//   return create({
//     base: 'dark',
//     brandTitle: 'HPE Design System Storybook',
//     brandUrl: 'https://design-system.hpe.design',
//     appBg: '#1A1A2E',
//     // ...other customizations
//   });
// };

// addons.setConfig({
//   theme: lightStorybookTheme, // Set default
// });
