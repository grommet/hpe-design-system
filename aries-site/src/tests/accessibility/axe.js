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
      exclude: [
        // These are known color contrast issues that have already been idenfitified here:
        // https://github.com/hpe-design/design-system/issues/251
        // To allow other accessibility features to be checked, these elements are temporarily
        // being excluded from the testing. After resolving, this should be removed.
        [
          // Paragraph on Foundation tile
          '.hFYaZW > .jkPKaQ.StyledBox-sc-13pk1d4-0 > .kphxBL.StyledBox-sc-13pk1d4-0 > .GvaHH',
        ],
        [
          // Paragraph on Design tile
          '.hrOJdT > .jkPKaQ.StyledBox-sc-13pk1d4-0 > .kphxBL.StyledBox-sc-13pk1d4-0 > .GvaHH',
        ],
      ],
    };
    const { violations } = await axeCheck(t, axeContext);
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
      exclude: [
        // These are known color contrast issues that have already been idenfitified here:
        // https://github.com/hpe-design/design-system/issues/251
        // To allow other accessibility features to be checked, these elements are temporarily
        // being excluded from the testing. After resolving, this should be removed.
        // Text on See in Figma button
        ['.fIVxyY'],
        // NextContent Text
        ['footer > .oKpSL.StyledText-sc-1sadyjn-0'],
        // NextContent Link
        ['.cMjHfA > .gvcthr'],
      ],
    };
    const { violations } = await axeCheck(t, axeContext);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});

test.before(async t => {
  await t.navigateTo('/resources');
})('should check Resources Page (Empty Page)', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const axeContext = {
      exclude: [
        // These are known color contrast issues that have already been idenfitified here:
        // https://github.com/hpe-design/design-system/issues/251
        // To allow other accessibility features to be checked, these elements are temporarily
        // being excluded from the testing. After resolving, this should be removed.
        // HPE in header
        ['.fkwEyF'],
        // Design System in header
        ['.dOIJAP.StyledBox-sc-13pk1d4-0 > .oKpSL.StyledText-sc-1sadyjn-0'],
        // Placeholder text in search
        ['input'],
        // Paragraph in header
        ['p'],
        // Text on feedback button
        ['.fIVxyY'],
      ],
    };
    const { violations } = await axeCheck(t, axeContext);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});
