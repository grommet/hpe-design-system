/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, repeatKeyPress, getTabCount } from './functions';

fixture('Navigation home tiles').page(baseUrl);

test('home tile with mouse click', async t => {
  const page = 'Components';
  const element = Selector('[data-test-id="anchor-tile"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('home tile with keyboard', async t => {
  const page = 'Components';
  const element = Selector('[data-test-id="anchor-tile"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

fixture('Topic').page(`${baseUrl}/guidelines/human-centered`);

test('Topic with mouse click', async t => {
  const page = 'Guidelines';
  const element = Selector('[data-test-id="topic"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('Topic with keyboard', async t => {
  const page = 'Guidelines';
  const element = Selector('[data-test-id="topic"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

fixture('Side Bar Nav').page(`${baseUrl}/guidelines/principles`);

test('Side Bar Nav with mouse click', async t => {
  const page = 'Philosophy';
  const element = Selector('[data-test-id="side-bar"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('Side Bar with keyboard', async t => {
  const page = 'Philosophy';
  const element = Selector('[data-test-id="side-bar"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

fixture('Next Content').page(`${baseUrl}/foundation/branding`);

test('Next Content with mouse click', async t => {
  const page = 'Color';
  const element = Selector('[data-test-id="next-content"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  // Need to maximize window so that link isn't hidden behind theme toggle otherwise test will fail
  await t
    .maximizeWindow()
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('Next Content with keyboard', async t => {
  const page = 'Color';
  const element = Selector('[data-test-id="next-content"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

fixture('NavPage items').page(`${baseUrl}/guidelines`);

test('NavPage items with mouse click', async t => {
  const page = 'Philosophy';
  const element = Selector('[data-test-id="navpage-link"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('NavPage items with keyboard', async t => {
  const page = 'Philosophy';
  const element = Selector('[data-test-id="navpage-link"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});
