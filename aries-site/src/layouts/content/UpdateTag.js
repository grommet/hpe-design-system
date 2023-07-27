import { Anchor, Text, Notification } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import pageVisitTracker from '../../utils/pageVisitTracker';
import { createBrowserHistory } from 'history';

export const UpdateTag = ({name}) => {
    const viewHistory = JSON.parse(window.localStorage.getItem("update-history"));
    const tokenName = `${name?.toLowerCase().replace(/\s+/g,'-')  }-last-visited`;
    const dateTime = new Date().getTime();
    let newUpdate, actionLink;

    //In general, I decided to keep the logic for tracking visitation in the updateTag
    //I did this because I ran into a lot of bugs with having it in Layout.js (trying to track data for parent pages and needing to communicate with content card)
    //so narrowing it down to this component (that will always be shown when there's an update) worked the best in this case
    if(viewHistory){
        if(name in viewHistory){
            let history = createBrowserHistory();

            if(history.location.hash.length === 0 && history.location.search.length === 0){
            //if we are on a guidance w/ no hash or query in the URL
            //this is the case when people enter the page for the first time that session (assuming they don't refresh the page)
                newUpdate = pageVisitTracker(name); //check if they've seen it before
                actionLink = viewHistory[name].action; //grab the section link

                //since it is their first time in this session viewing the page (assuming they don't refresh the page), now store the information
                window.localStorage.setItem(tokenName, dateTime); //holds the most recent viewing time
                viewHistory[name].update = newUpdate; //sets the "update state" for the component in overarching update-history
                window.localStorage.setItem("update-history", JSON.stringify(viewHistory));
                //^^this allows for easy access across other components that need to access it in strange cases (like the refresh in the internal navigation)
            }else{ 
            //the case where they have come to the page, but it refreshes it with a hash added to the link via the sideNav bar
            //it keeps the pre-established update state in the general "update-history" from when they first came on the page
            //this is the part that keeps the inline notif and sidebar navigation as they internally navigate the page
                newUpdate = viewHistory[name].update;
                //^^grab it from the previously stated update state
                //^^trying to use the pageVisitTracker function in this case would grab the most recent visit, say it's been seen, and report that the update shouldnt be shown (and it should be shown)
                actionLink = viewHistory[name].action;
            }
        }else{
            newUpdate = false;
        }
    }

    return(
        <>
        {newUpdate &&  (viewHistory[name].type === "Update") &&
            <Notification width='large'
            title={"Updated " + new Date(viewHistory[name].date).toDateString()} 
            message={
                <>
                <Text>{viewHistory[name].description + "    "}
                {viewHistory[name].action.length > 1 && 
                    <Anchor label='Link' href={actionLink}/> 
                }
                </Text>
                </>
            } 
            margin={{ bottom: 'medium' }} icon={<CircleInformation/>}
            />
        }
        {newUpdate &&  (viewHistory[name].type === "New") &&
            <Notification width='large'
            title={"Added on " + new Date(viewHistory[name].date).toDateString()} 
            message={
                <>
                <Text>
                This item is new. Let the Design Systems team know if you have any feedback. 
                </Text>
                </>
            } 
            margin={{ bottom: 'medium' }} icon={<CircleInformation/>}
            />
        }
        </>
    );
};
