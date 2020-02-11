/* eslint-disable max-len */
/* eslint-disable no-undef */
import { axeCheck, createReport } from 'axe-testcafe';
import { baseUrl } from './functions';

fixture('TestCafe tests with Axe').page(baseUrl);

test('Landing Page', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const axeContext = {
      exclude: [
        // These are known color contrast issues that have already been idenfitified here:
        // https://github.com/hpe-design/design-system/issues/251
        // To allow other accessibility features to be checked, these elements are temporarily
        // being excluded from the testing. After resolving, this should be removed.
        [
          '.hFYaZW > .jkPKaQ.StyledBox-sc-13pk1d4-0 > .kphxBL.StyledBox-sc-13pk1d4-0 > .GvaHH',
        ],
        [
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
})('Guidelines Page (NavPage)', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const { violations } = await axeCheck(t);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});

test.before(async t => {
  await t.navigateTo('/foundation/branding');
})('Branding Page (SidebarLayout Page)', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const axeContext = {
      exclude: [
        // These are known color contrast issues that have already been idenfitified here:
        // https://github.com/hpe-design/design-system/issues/251
        // To allow other accessibility features to be checked, these elements are temporarily
        // being excluded from the testing. After resolving, this should be removed.
        ['.fIVxyY'],
        ['footer > .oKpSL.StyledText-sc-1sadyjn-0'],
        ['.cMjHfA > .gvcthr'],
      ],
    };
    const { violations } = await axeCheck(t, axeContext);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});

test.before(async t => {
  await t.navigateTo('/design');
})('Design Page (Empty Page)', async t => {
  // Only need to run in one browser
  if (t.browser.name === 'Chrome') {
    const axeContext = {
      exclude: [
        // These are known color contrast issues that have already been idenfitified here:
        // https://github.com/hpe-design/design-system/issues/251
        // To allow other accessibility features to be checked, these elements are temporarily
        // being excluded from the testing. After resolving, this should be removed.
        ['.fkwEyF'],
        ['.dOIJAP.StyledBox-sc-13pk1d4-0 > .oKpSL.StyledText-sc-1sadyjn-0'],
        ['input'],
        ['p'],
      ],
    };
    const { violations } = await axeCheck(t, axeContext);
    await t.expect(violations.length === 0).ok(createReport(violations));
  }
});
