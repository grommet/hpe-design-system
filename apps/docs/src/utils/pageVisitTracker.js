export const getLocalStorageKey = title =>
  `${title?.toLowerCase().replace(/\s+/g, '-')}-last-visited`;

// determines whether or not the update should be shown given
// the most recent commit and last-visit records
export const pageVisitTracker = (title, contentHistory) => {
  // the name associated with the values in localStorage
  const localStorageKey = getLocalStorageKey(title);
  let showUpdate;
  if (contentHistory && title in contentHistory) {
    // there has been a reported update within the last 30 days
    if (window.localStorage.getItem(localStorageKey)) {
      // there has been a guaranteed update and we've seen this page before
      if (
        window.localStorage.getItem(localStorageKey) >
        new Date(contentHistory[title].date).getTime()
      ) {
        // if when they saw the page is after the update, dont show it
        showUpdate = false;
      } else {
        // page has reported an update within 30 days, it has
        // been seen before, but it was before the update was released
        showUpdate = true;
      }
    } else {
      // it's within 30 days but it has never seen the page before
      showUpdate = true;
    }
  } else {
    showUpdate = false; // no update, nothing reported in the PRs
  }
  return showUpdate;
};
