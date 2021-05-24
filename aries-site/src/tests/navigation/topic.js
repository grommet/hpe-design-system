/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, tabToHref } from '../utils';

// This is testing the topic link that appears above the h1 of content pages.
// This link routes back to NavPages.

fixture('Topic').page(`${baseUrl}/foundation/human-centered`);

test('should navigate to correct path when a topic is clicked on', async t => {
  const page = 'Foundation';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

// eslint-disable-next-line max-len
test('should navigate to correct path when a topic is choosen via keyboard',
  async t => {
  const page = 'Foundation';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await tabToHref(t, expectedPath);

  await t
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});