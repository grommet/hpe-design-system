import { create } from '@storybook/theming';
import logo from './public/hpe.svg';

const HpeBrand = '#00C781';

// https://storybook.js.org/docs/configurations/theming/
export default create({
  base: 'dark',

  barSelectedColor: HpeBrand,
  colorSecondary: HpeBrand,

  brandUrl: 'https://design-system.hpe.design/',
  brandImage: logo,
});
