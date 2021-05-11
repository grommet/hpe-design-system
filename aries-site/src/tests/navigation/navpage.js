/* eslint-disable max-len */
/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, tabToHref } from '../utils';

// A NavPage is a page that contains a main header followed by a list of sub-topics

fixture('NavPage sub-topics').page(`${baseUrl}/foundation`);

test('should navigate to correct path when a sub-topic is clicked on', async t => {
  const page = 'Philosophy';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('should navigate to correct path when a sub-topic is choosen via keyboard', async t => {
  const page = 'Philosophy';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await tabToHref(t, expectedPath);

  await t
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});