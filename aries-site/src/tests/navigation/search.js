/* eslint-disable max-len */
/* eslint-disable no-undef */
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';
import { baseUrl, getLocation, repeatKeyPress } from '../utils';

// Selector name found using Chrome React dev tools on prod mode of website
const Search = 'D Box';

const getSuggestion = page => {
  return ReactSelector(`${Search} StyledDrop Button`).withText(page);
};

fixture('Search')
  .page(baseUrl)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should navigate to correct page after user types and clicks suggestion with mouse', async t => {
  const page = 'Develop';
  const expectedPath = `${baseUrl}/${page.toLowerCase()}`;
  const suggestion = getSuggestion(page);
  await t
    .typeText(ReactSelector(Search), 'dev')
    .click(suggestion)
    .expect(getLocation())
    .eql(expectedPath);
});

test('should navigate to correct page after user types page name and hits enter', async t => {
  const page = 'Foundation';
  const expectedPath = `${baseUrl}/${page.toLowerCase()}`;

  await t
    .typeText(ReactSelector(Search), page)
    .pressKey('enter')
    .expect(getLocation())
    .eql(expectedPath);
});

test('should navigate to correct hash after user clicks a suggestion that leads to a page subsection', async t => {
  const expectedPath = '/foundation/color#background-colors';
  const page = 'Background Colors';
  const suggestion = getSuggestion(page);

  await t
    .typeText(ReactSelector(Search), 'col')
    .click(suggestion)
    .expect(getLocation())
    .eql(baseUrl + expectedPath);
});

test('should navigate to correct page when user is only using keyboard ', async t => {
  const page = 'Aruba Logo';
  const expectedPath = '/foundation/branding#aruba-logo';
  const search = ReactSelector(`${Search} Search__StyledTextInput`);

  await t
    // theme toggle --> hpe button --> search
    .pressKey(await repeatKeyPress('tab', 3))
    // start typing for something
    .pressKey('a');

  // find how many times to press down arrow key to get to suggestion
  const suggestions = await search.getReact(({ props }) => props.suggestions);
  let count;
  suggestions.forEach((suggestion, index) =>
    // add one since array index starts at 0
    suggestion === page ? (count = index + 1) : undefined,
  );

  await t
    .pressKey(await repeatKeyPress('down', count))
    .pressKey('enter')
    .expect(getLocation())
    .eql(baseUrl + expectedPath);
});
