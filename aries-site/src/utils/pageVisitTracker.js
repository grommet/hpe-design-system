//this is the function i call to report whether or not the update should be shown given the most recent commit and last-visit records
const pageVisitTracker = function (title) {
  const tokenName = `${title?.toLowerCase().replace(/\s+/g, '-')}-last-visited`; // the name associated with the values in localStorage
  let newUpdate;
  let history = JSON.parse(window.localStorage.getItem('update-history'));
  if (title in history) {
    //there has been a reported update within the last 30 days
    if (window.localStorage.getItem(tokenName)) {
      //there has been a guaranteed update and we've seen this page before
      if (
        window.localStorage.getItem(tokenName) >
        new Date(history[title].date).getTime()
      ) {
        //when we've seen this page, has it been after the update?
        newUpdate = false; //this means that the page has a reported update within 30 days, it has been seen before, but they have already seen this update
      } else {
        newUpdate = true; //this means that the page has a reported update within 30 days, it has been seen before, and when it has been seen, it was before the update
      }
    } else {
      //it's within 30 days but we have never seen the page before
      newUpdate = true;
    }
  } else {
    newUpdate = false; //definitely no update, nothing reported in the PRs
  }
  return newUpdate;
};

export default pageVisitTracker;
