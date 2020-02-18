/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, repeatKeyPress, getTabCount } from '../utils';

fixture('Home page tiles').page(baseUrl);

test('should navigate to correct path when a tile is clicked on', async t => {
  const page = 'Components';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .click(element)
    .expect(getLocation())
    .contains(expectedPath);
});

// eslint-disable-next-line max-len
test('should navigate to correct path when a tile is choosen via keyboard', async t => {
  const page = 'Components';
  const element = Selector('a').withText(page);
  const expectedPath = await element.getAttribute('href');

  await t
    .pressKey(await repeatKeyPress('tab', await getTabCount(expectedPath)))
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

/*Added range to this test since now there is some issues with different browsers as to where
the page actually lands when routed to a deep link
*/

fixture('Deep linking').page(baseUrl);

test('should navigate to correct hash of page when a deep link is directly routed to', async t => {
  const url = `${baseUrl}/foundation/color#background-colors`
  const pageSection = Selector('#background-colors');
  await t
    .navigateTo(url)
    .expect(pageSection.getBoundingClientRectProperty("top"))
    .within(-150, 150);
});
