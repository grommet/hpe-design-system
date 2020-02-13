/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, repeatKeyPress, getTabCount } from '../utils';

// This is testing the navigation links that appear in the sidebar of the
// content pages

fixture('Sidebar NavLinks').page(`${baseUrl}/guidelines/principles`);

test('should navigate to correct path when a side-bar option is clicked on', async t => {
  const page = 'Philosophy';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('should navigate to correct path when a side-bar option is choosen via keyboard', async t => {
  const page = 'Philosophy';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});
