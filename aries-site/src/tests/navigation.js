/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import {
  baseUrl,
  getLocation,
  repeatKeyPress,
} from './functions';

fixture('Navagation home tiles').page(baseUrl);

test('home tile with mouse click', async t => {
    const page = 'Components';
    const suggestion = Selector('[data-test-id="anchor-tile"]').withText(page);
    const expectedPath = await suggestion.getAttribute('href');
    await t
      .click(suggestion)
      .expect(getLocation())
      .contains(expectedPath);
  });

  test('home tile with keyboard', async t => {
    const page = 'Components';
    const suggestion = Selector('[data-test-id="anchor-tile"]').withText(page);
    const expectedPath = await suggestion.getAttribute('href');
    await t
      .pressKey(await repeatKeyPress('tab', 6))
      .pressKey('enter')
      .expect(getLocation())
      .contains(expectedPath);
  });

  fixture('Navagation tiles').page('http://localhost:3000/guidelines');

  test('Nav Tiles with mouse click', async t => {
    const expectedPath = '/guidelines/philosophy';
    const page = 'Philosophy';
    const suggestion = Selector('[data-test-id="nav-tile"]').withText(page);
    await t
      .click(suggestion)
      .expect(getLocation())
      .contains(expectedPath);
  });

  test('Nav Tiles with keyboard', async t => {
    const expectedPath = '/guidelines/philosophy';
    await t
      .pressKey(await repeatKeyPress('tab', 4))
      .pressKey('enter')
      .expect(getLocation())
      .contains(expectedPath);
  });

  fixture('Topic').page('http://localhost:3000/guidelines/human-centered');

  test('Topic with mouse click', async t => {
    const page = 'Guidelines';
    const suggestion = Selector('[data-test-id="topic"]').withText(page);
    const expectedPath = await suggestion.getAttribute('href');
    await t
      .click(suggestion)
      .expect(getLocation())
      .contains(expectedPath);
  });

  test('Topic with keyboard', async t => {
    const page = 'Guidelines';
    const suggestion = Selector('[data-test-id="topic"]').withText(page);
    const expectedPath = await suggestion.getAttribute('href');
    await t
      .pressKey(await repeatKeyPress('tab', 4))
      .pressKey('enter')
      .expect(getLocation())
      .contains(expectedPath);
  });

fixture('Side Bar Nav').page('http://localhost:3000/guidelines/principles');

test('Side Bar Nav with mouse click', async t => {
    const page = 'Philosophy';
    const suggestion = Selector('[data-test-id="side-bar"]').withText(page);
    const expectedPath = await suggestion.getAttribute('href');
    await t
      .click(suggestion)
      .expect(getLocation())
      .contains(expectedPath);
  });

  test('Side Bar with keyboard', async t => {
    const page = 'Philosophy';
    const suggestion = Selector('[data-test-id="side-bar"]').withText(page);
    const expectedPath = await suggestion.getAttribute('href');
    await t
      .pressKey(await repeatKeyPress('tab', 10))
      .pressKey('enter')
      .expect(getLocation())
      .contains(expectedPath);
  });

  fixture('Next Content').page('http://localhost:3000/foundation/branding');

  test('Next Content with mouse click', async t => {
  const page = "Color"
  const suggestion = Selector('[data-test-id="next-content"]').withText(page);
  const expectedPath = await suggestion.getAttribute('href');
  await t
    .click(suggestion)
    .expect(getLocation())
    .contains(expectedPath);
});

  test('Next Content with keyboard', async t => {
    const expectedPath = '/color';
    await t
      .pressKey(await repeatKeyPress('tab', 19))
      .pressKey('enter')
      .expect(getLocation())
      .contains(expectedPath);
  });