import { create } from '@storybook/theming';
import logo from '../.storybook/public/hpe.svg';
// https://storybook.js.org/docs/configurations/theming/

export default create({
  base: 'dark',

  barSelectedColor: '#00C781',
  colorSecondary: '#00C781',

  brandTitle: 'Aries',
  brandUrl: 'https://aries.hpe.design/',
  brandImage: logo,
});
