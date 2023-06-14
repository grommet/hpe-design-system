
import { GREENLAKE_DEV_SITE, GREENLAKE_PROD_SITE } from './constants';

export const PROD_ENV = 'prod';
export const TEST_ENV = 'test';

// eslint-disable-next-line consistent-return
export function isGreenlakeProductSite (window) {
  const domain = window.location.hostname;
  const { localStorage } = window;
  const testParameter = /[?&]testal=/.test(window.location.search);
  const testState = localStorage.getItem('testal') === 'true';
  if (GREENLAKE_DEV_SITE.test(domain) || testParameter || testState) {
    localStorage.setItem('testal', 'true');
    return TEST_ENV;
  } if (GREENLAKE_PROD_SITE.test(domain)) {
    return PROD_ENV;
  }
}
