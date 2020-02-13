/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, repeatKeyPress, getTabCount } from '../utils';

// This is testing the topic link that appears above the h1 of content pages.
// This link routes back to NavPages.

fixture('Topic').page(`${baseUrl}/guidelines/human-centered`);

test('should navigate to correct path when a topic is clicked on', async t => {
  const page = 'Guidelines';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('should navigate to correct path when a topic is choosen via keyboard', async t => {
  const page = 'Guidelines';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});
