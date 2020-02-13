/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import {
  baseUrl,
  getLocation,
  formatForTyping,
  repeatKeyPress,
} from '../utils';

fixture('Search').page(baseUrl);

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

test('type direct match then press enter to navigate', async t => {
  const page = 'Foundation';
  const expectedPath = `${baseUrl}/${page.toLowerCase()}`;

  await t
    .typeText('[data-test-id="search"]', 'color')
    .pressKey(await repeatKeyPress('backspace', 5))
    .pressKey(await formatForTyping(page))
    .pressKey('enter')
    .expect(getLocation())
    .eql(expectedPath);
});

test('click on subsection links to correct hash', async t => {
  const expectedPath = '/foundation/color#background-colors';
  const page = 'Background Colors';
  const suggestion = Selector('[data-test-id="suggestions"] button').withText(
    page,
  );

  await t
    .typeText('[data-test-id="search"]', 'Col')
    .click(suggestion)
    .expect(getLocation())
    .eql(baseUrl + expectedPath);
});

// To be improved so that value is less hard coded
test('navigate with keyboard only', async t => {
  const expectedPath = '/foundation/color#background-colors';

  await t
    // theme toggle --> hpe button --> search
    .pressKey(await repeatKeyPress('tab', 3))
    .pressKey(await formatForTyping('col')) // type part of search term
    .pressKey('down')
    .pressKey('enter')
    .expect(getLocation())
    .eql(baseUrl + expectedPath);
});
