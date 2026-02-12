/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, tabToHref } from '../utils';

fixture('Home page').page(baseUrl);

test('should navigate to correct path in Header when clicked on', async t => {
  const page = 'Components';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t.click(element).expect(getLocation()).contains(expectedPath);
});

// eslint-disable-next-line max-len
test(`should navigate to correct path in Header when choosen 
  via keyboard`, async t => {
  const page = 'Components';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await tabToHref(t, expectedPath);

  await t.pressKey('enter').expect(getLocation()).contains(expectedPath);
});

// eslint-disable-next-line max-len
test('should navigate to correct card in home page when clicked on', async t => {
  const page = 'Color';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t.click(element).expect(getLocation()).contains(expectedPath);
});

// Temporarily commenting out test because the site is functioning properply,
// but our function calculating how many tabs to an item is not. Will uncomment
// once it has been resolved, but don't want to block other tests from running
// as we make commits
// eslint-disable-next-line max-len
test('should navigate to correct path in home page card when choosen via keyboard', async t => {
  const page = 'Color';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await tabToHref(t, expectedPath);

  await t.pressKey('enter').expect(getLocation()).contains(expectedPath);
});
