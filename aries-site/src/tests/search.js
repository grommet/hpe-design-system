/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { baseUrl, getLocation, formatForTyping } from './functions';

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
    .pressKey('backspace backspace backspace backspace backspace')
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

test('navigate with keyboard only', async t => {
  const expectedPath = '/foundation/color#background-colors';

  await t
    .pressKey('tab') // theme toggle
    .pressKey('tab') // hpe button
    .pressKey('tab') // search
    .pressKey(await formatForTyping('col')) // type part of search term
    .pressKey('down')
    .pressKey('enter')
    .expect(getLocation())
    .eql(baseUrl + expectedPath);
});
