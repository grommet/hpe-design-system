/* eslint-disable no-undef */
import { waitForReact } from 'testcafe-react-selectors';
import { screen } from '@testing-library/testcafe';

import { baseUrl, getLocation } from '../utils';
import Navbar from '../../page-objects/components/Navbar';

const navbar = new Navbar();

fixture('Search')
  .page(baseUrl)
  .beforeEach(async () => {
    await waitForReact();
  });

test(`should navigate to correct page after user types and clicks suggestion 
with mouse`, async t => {
  const page = 'Templates';
  const expectedPath = `${baseUrl}/${page.toLowerCase()}`;
  const suggestion = screen.getAllByRole('option').withText(page);

  navbar.searchFor(page);
  await t
    .click(suggestion)
    .expect(getLocation())
    .contains(expectedPath);
});

test(`should navigate to correct page after user types page name and hits 
enter`, async t => {
  const page = 'Foundation';
  const expectedPath = `${baseUrl}/${page.toLowerCase()}`;

  navbar.searchFor(page);
  await t
    .pressKey('enter')
    .expect(getLocation())
    .contains(expectedPath);
});

test(`should navigate to correct hash after user clicks a suggestion that leads 
to a page subsection`, async t => {
  const query = 'elevat';
  const expectedPath = `${baseUrl}/foundation/color?q=${query}#elevation`;
  const page = 'Color';
  const suggestion = screen.getAllByRole('option').withText(page);

  navbar.searchFor(query);
  await t
    .setTestSpeed(0.1)
    .click(suggestion)
    .expect(getLocation())
    .eql(expectedPath);
});

// commenting out until https://github.com/grommet/grommet/issues/4875
// is resolved
// test(`should navigate to correct page when user is only using
// keyboard`, async t => {
//   const page = 'Aruba Logo';
//   const expectedPath = `${baseUrl}/foundation/our-brand#aruba-logo`;

//   await navbar.searchFor('a', { keyboard: true });
//   await navbar.navigateToSuggestion(page);
//   await t.expect(getLocation()).eql(expectedPath);
// });
