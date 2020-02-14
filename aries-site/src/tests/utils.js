import { ClientFunction } from 'testcafe';

export const baseUrl = 'http://localhost:3030';

export const getLocation = ClientFunction(() => document.location.href);

export const formatForTyping = ClientFunction(text => text.split('').join(' '));

export const repeatKeyPress = ClientFunction((key, number) => {
  // Array.join puts the argument between the array elements,
  // so we need to add 1 to get the correct output
  return Array(number + 1).join(`${key} `);
});

// find how many tabs it takes to reach desired element
export const getTabCount = ClientFunction(expectedPath => {
  const tabbableElements = document.querySelectorAll(
    // eslint-disable-next-line max-len
    'button, body [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );

  let hrefIndex;
  for (let i = 0; i < tabbableElements.length; i += 1) {
    if (tabbableElements[i].getAttribute('href') === expectedPath) {
      hrefIndex = i;
    }
  }
  return hrefIndex;
});
