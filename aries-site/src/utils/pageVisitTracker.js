// determines whether or not the update should be shown given the most recent commit and last-visit records
const pageVisitTracker = function (title) {
  const localStorageKey = `${title
    ?.toLowerCase()
    .replace(/\s+/g, '-')}-last-visited`; // the name associated with the values in localStorage
  let newUpdate;
  let history = JSON.parse(window.localStorage.getItem('update-history'));
  if (title in history) {
    //there has been a reported update within the last 30 days
    if (window.localStorage.getItem(localStorageKey)) {
      //there has been a guaranteed update and we've seen this page before
      if (
        window.localStorage.getItem(localStorageKey) >
        new Date(history[title].date).getTime()
      ) {
        //if when they saw the page is after the update, dont show it
        newUpdate = false;
      } else {
        //page has reported an update within 30 days, it has been seen before, but it was before the update was released
        newUpdate = true;
      }
    } else {
      //it's within 30 days but it has never seen the page before
      newUpdate = true;
    }
  } else {
    newUpdate = false; // no update, nothing reported in the PRs
  }
  return newUpdate;
};

export default pageVisitTracker;
