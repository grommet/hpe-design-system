import { ClientFunction } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';
import percySnapshot from '@percy/testcafe';

export const baseUrl = 'http://localhost:3030';

// Selector name found using Chrome React dev tools on prod mode of website
export const Search = 'Search__StyledTextInput';

export const getLocation = ClientFunction(() => document.location.href);

export const formatForTyping = ClientFunction(text => text.split('').join(' '));

export const getSuggestion = page => {
  return ReactSelector(`${Search} StyledDrop Button`).withText(page);
};

export const repeatKeyPress = ClientFunction((key, number) => {
  // Array.join puts the argument between the array elements,
  // so we need to add 1 to get the correct output
  return Array(number + 1).join(`${key} `);
});

// find how many tabs it takes to reach desired element
export const getTabCount = ClientFunction(expectedPath => {
  const tabbableElements = document.querySelectorAll(`
    button[tabindex]:not([tabindex="-1"]), button[id="search-button"], 
    input[tabindex]:not([tabindex="-1"]), body [href], 
    input[tabindex]:not([tabindex="-1"]), 
    select[tabindex]:not([tabindex="-1"]), 
    textarea[tabindex]:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])`);

  let hrefIndex;
  for (let i = 0; i < tabbableElements.length; i += 1) {
    if (tabbableElements[i].getAttribute('href') === expectedPath) {
      hrefIndex = i;
    }
  }
  // Need to add one for correct tab count because array indexes start at 0.
  // If item we are aiming to tab to is at index = 3, that means we have to tab
  // 4 times to get there.
  return hrefIndex + 1;
});

export const tabToSearch = ClientFunction(() => {
  const tabbableElements = document.querySelectorAll(`
  button[tabindex]:not([tabindex="-1"]), button[id="search-button"], 
    input[tabindex]:not([tabindex="-1"]), body [href], 
    input[tabindex]:not([tabindex="-1"]), 
    select[tabindex]:not([tabindex="-1"]), 
    textarea[tabindex]:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])`);

  let tabCount;
  for (let i = 0; i < tabbableElements.length; i += 1) {
    if (tabbableElements[i].getAttribute('id') === 'search-button') {
      tabCount = i;
    }
  }
  // Need to add one for correct tab count because array indexes start at 0.
  // If item we are aiming to tab to is at index = 3, that means we have to tab
  // 4 times to get there.
  return tabCount + 1;
});

export const takeResponsiveSnapshots = async (t, title) => {
  await t.resizeWindow(1280, 720); // resize for mobile
  await percySnapshot(t, `Desktop — ${title}`, {
    widths: [1280],
  });
  await t.resizeWindow(375, 667); // resize for mobile
  await percySnapshot(t, `Mobile — ${title}`, {
    widths: [375],
  });
};
