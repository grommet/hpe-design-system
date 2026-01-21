import {
  addons,
  // useGlobals
} from 'storybook/manager-api';
import { lightTheme } from './yourTheme';
// import { createStorybookTheme } from './yourTheme';

// // const MyAddonPanel = () => {
// //   const [globals, updateGlobals] = useGlobals();

// //   // You can now use 'globals' to read the current values
// //   console.log('Current theme global:', globals.theme);

// //   // You can also use updateGlobals to change a value
// // };

// // const [globals, updateGlobals] = useGlobals();

// addons.setConfig({
//   theme: createStorybookTheme('light'),
//   //   theme: globals.theme === 'light' ? lightStorybookTheme : darkStorybookTheme,
// });

// // Example of using the hook (might be in a custom manager panel/addon)
// const MyThemeDetectorComponent = () => {
//   const [{ theme }] = useGlobals();
//   // 'theme' global would need to be set up in preview.js for the manager to detect it this way
//   // or you listen to the channel events if using storybook-dark-mode addon

//   if (theme === 'dark') {
//     // Logic for dark mode detected in manager
//     console.log('Dark mode active in manager');
//   } else {
//     // Logic for light mode
//     console.log('Light mode active in manager');
//   }

//   return null; // This component might just run side effects
// };

// addons.setConfig({
//   // navSize: 300,
//   // bottomPanelHeight: 300,
//   // rightPanelWidth: 300,
//   // panelPosition: 'bottom',
//   // enableShortcuts: true,
//   // showToolbar: true,
//   theme: lightTheme,
//   // selectedPanel: undefined,
//   // initialActive: 'sidebar',
//   // layoutCustomisations: {
//   //   showSidebar(state: State, defaultValue: boolean) {
//   //     return state.storyId === 'landing' ? false : defaultValue;
//   //   },
//   //   showToolbar(state: State, defaultValue: boolean) {
//   //     return state.viewMode === 'docs' ? false : defaultValue;
//   //   },
//   // },
//   // sidebar: {
//   //   showRoots: false,
//   //   collapsedRoots: ['other'],
//   // },
//   // toolbar: {
//   //   title: { hidden: false },
//   //   zoom: { hidden: false },
//   //   eject: { hidden: false },
//   //   copy: { hidden: false },
//   //   fullscreen: { hidden: false },
//   // },
// });
