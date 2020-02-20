/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, repeatKeyPress, getTabCount } from '../utils';

// This is testing the link at the footer of content pages that says
// "Next, learn about ____ >"

fixture('NextContent Link').page(`${baseUrl}/foundation/branding`);

test('should navigate to correct path when the'
+ 'next-content is clicked on', async t => {
  const page = 'Color';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  // Need to maximize window so that link isn't hidden behind theme
  // toggle otherwise test will fail
  await t
    .maximizeWindow()
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

test('should navigate to correct path when a next-content'
+ 'is choosen via keyboard', async t => {
  const page = 'Color';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});
