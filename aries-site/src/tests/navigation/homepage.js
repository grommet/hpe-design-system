/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, repeatKeyPress, getTabCount } from '../utils';

fixture('Home page').page(baseUrl);

test('should navigate to correct path in Header when clicked on', async t => {
  const page = 'Components';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

// eslint-disable-next-line max-len
test('should navigate to correct path in Header when choosen via keyboard', async t => {
  const page = 'Components';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

// eslint-disable-next-line max-len
test('should navigate to correct tile in home page when clicked on', async t => {
  const page = 'Color';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

// eslint-disable-next-line max-len
test('should navigate to correct path in home page tile when choosen via keyboard', async t => {
  const page = 'Color';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

