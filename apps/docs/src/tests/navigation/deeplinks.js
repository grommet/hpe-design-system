/* eslint-disable no-undef */
import { waitForReact } from 'testcafe-react-selectors';
// import { Selector } from 'testcafe';
import { baseUrl } from '../utils';

/* A deeplink is a subsection of a page. These tests check if the
website is taken to the right scroll position of the
page to match the hash of the intended subsection.
*/

fixture('Deep Linking')
  .page(baseUrl)
  .beforeEach(async t => {
    await waitForReact();
    await t.maximizeWindow();
  });

/* This test will fail until issue #320 is fixed.
The page scroll is at the incorrect section of the 
page therefore it is failing. Going to leave commented out for now. 
*/

// test('should navigate to correct hash after user clicks a
// suggestion that leads to a page subsection', async t => {
//   const page = 'Background Colors';
//   const backgroundColors = Selector('#background-colors')
//   const suggestion = getSuggestion(page);

//   await t
//     .typeText(ReactSelector(Search), 'col')
//     .click(suggestion)
//     .expect(backgroundColors.getBoundingClientRectProperty("top"))
//     .within(-150, 150);
// });

/* Added range to this test since now there is some issues
with different browsers as to where
the page actually lands when routed to a deep link
*/

// Issue introduced by Next13
// test(
//   'should navigate to correct hash of page when' +
//     'a deep link is directly routed to',
//   async t => {
//     const url = `${baseUrl}/foundation/color#background-colors`;
//     const pageSection = Selector('#background-colors');
//     await t
//       .navigateTo(url)
//       .expect(pageSection.getBoundingClientRectProperty('top'))
//       .within(-150, 150);
//   },
// );
