// eslint-disable-next-line no-undef
fixture('Getting Started').page('http://localhost:3000');

test('allows user to click on search and type into input', async t => {
  // Test code
  await t.typeText('[data-test-id="search"]', 'Color');
});
