import { ClientFunction, Selector } from 'testcafe';

const baseUrl = 'http://localhost:3000';
const getLocation = ClientFunction(() => document.location.href);

fixture('Search Component').page(baseUrl);

test('type then click on search suggestion', async t => {
  const page = 'Develop';
  const expectedPath = `${baseUrl}/${page.toLowerCase()}`;
  const suggestion = Selector('[data-test-id="suggestions"] button').withText(
    page,
  );
  await t
    .typeText('[data-test-id="search"]', 'dev')
    .click(suggestion)
    .expect(getLocation())
    .eql(expectedPath);
});

test('type then hit enter for direct match', async t => {
  const page = 'Foundation';
  const expectedPath = `${baseUrl}/${page.toLowerCase()}`;
  await t
    .typeText('[data-test-id="search"]', 'color')
    .pressKey('backspace backspace backspace backspace backspace')
    .typeText('[data-test-id="search"]', page)
    .pressKey('enter')
    .expect(getLocation())
    .eql(expectedPath);
});

test('clicking on subsection links to correct hash', async t => {
  const expectedPath = '/foundation/color#background-colors';
  await t
    .typeText('[data-test-id="search"]', 'Col')
    .pressKey('down')
    .pressKey('enter')
    .expect(getLocation())
    .eql(baseUrl + expectedPath);
});
