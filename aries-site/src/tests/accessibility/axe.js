/* eslint-disable max-len */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { axeCheck, createReport } from 'axe-testcafe';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';
import { baseUrl } from '../utils';

fixture('Axe accessibility tests')
  .page(baseUrl)
  // start tests in light mode
  .beforeEach(async t => {
    await waitForReact();
    const themeMode = Selector('body').getAttribute('class');
    const themeToggleButton = ReactSelector('ThemeModeToggle');
    const lightMode = (await themeMode) === 'light-mode';
    if (!lightMode) {
      await t.click(themeToggleButton);
    }
  });

test('should check Home page', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const axeContext = {
      exclude: [],
    };
    const axeOptions = { rules: { 'color-contrast': { enabled: false } } };
    const { violations } = await axeCheck(t, axeContext, axeOptions);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});

test.before(async t => {
  await t.navigateTo('/guidelines');
})('should check Guidelines (NavPage)', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const { violations } = await axeCheck(t);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});

test.before(async t => {
  await t.navigateTo('/foundation/branding');
})('should check Branding Page (SidebarLayout)', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const axeContext = {
      exclude: [],
    };
    const axeOptions = { rules: { 'color-contrast': { enabled: false } } };
    const { violations } = await axeCheck(t, axeContext, axeOptions);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});

test.before(async t => {
  await t.navigateTo('/resources');
})('should check Resources Page (Empty Page)', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const axeContext = {
      exclude: [],
    };
    const axeOptions = { rules: { 'color-contrast': { enabled: false } } };
    const { violations } = await axeCheck(t, axeContext, axeOptions);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});
