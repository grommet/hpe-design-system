import contributorCommitMessages from '../layouts/content/ContributerCommitMessages';
//NOT FUNCTIONAL WITH THE PR METHOD YET, THIS IS WHAT I'M WORKING ON NOW
// I haven't connected it just yet, but I would implement this in the ContentCard.js and Layout.js for the updateTag
const pageVisitTracker = function(title, currentFileName, topic){
  const dateTime = new Date().getTime();
  const tokenName = `${title?.toLowerCase().replace(/\s+/g,'-')  }-last-visited`; // the name associated with the values in localStorage
  let newUpdate;
  const updateLog = contributorCommitMessages(currentFileName, topic);
  console.log(updateLog);

  // add edge cases for the main catalog pages
  // if the info already exists and it's not a main page we are on, then go ahead and check the next
  if(window.localStorage.getItem(tokenName)){
    // if the time they last visited the page (minus 5 seconds to cover that weird refresh) is older than the most recent commit
    if((window.localStorage.getItem(tokenName)) < new Date(updateLog[0].date).getTime()){
      newUpdate = true; // then show the update
    }else{ // in the case where they have the token, but they have already seen the update
      newUpdate = false;
    }
    if(window.localStorage.getItem(tokenName) > new Date(now.getTime() - 5*1000)){ // if the most recent token is older than 5 seconds ago then set it, otherwise dont. this covers cases of the page refreshing a few times
      window.localStorage.setItem(tokenName, dateTime);
    }
  }else if(updateLog.length === 0){
    console.log("here!");
    newUpdate=false;
  }
  else{ // in the case that they do not have the token
    if(new Date(updateLog[0].date).getTime() > new Date(new Date().setDate(dateTime.getDate() - 30))){ // if it is been less than 30 days since the commit
      newUpdate = true;
    }else{ // if the most recent commit isn't new anymore
      newUpdate = false;
    }
    window.localStorage.setItem(tokenName, dateTime);// set token
  }
  return newUpdate; 
};

export default pageVisitTracker;