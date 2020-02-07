/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, repeatKeyPress } from './functions';

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
    .pressKey(await repeatKeyPress('tab', 6))
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
    .pressKey(await repeatKeyPress('tab', 4))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

fixture('Side Bar Nav').page('http://localhost:3000/guidelines/principles');

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
    .pressKey(await repeatKeyPress('tab', 10))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

fixture('Next Content').page('http://localhost:3000/foundation/branding');

test('Next Content with mouse click', async t => {
  const page = 'Color';
  const element = Selector('[data-test-id="next-content"]').withText(page);
  const expectedPath = await element.getAttribute('href');
  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('Next Content with keyboard', async t => {
  const page = 'Color';
  const element = Selector('[data-test-id="next-content"]').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', 19))
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
    .pressKey(await repeatKeyPress('tab', 4))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});
