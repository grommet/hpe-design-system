import { Anchor, Notification } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import contributorCommitMessages from './ContributerCommitMessages';

export const UpdateTag = ({ topic, currentFileName }) => {
    // I had to re-run the fetch in this file because the API wasn't being called when I refreshed/changed guidances it in the parent Layout page
    // It only seems to work when it is being re-ran here per page change? Hopefully I dont jinx it?
    // Right now, I just grab the most recent commit, and send it out in the Notification component
    const updateLog = contributorCommitMessages(topic, currentFileName);
    if(updateLog.length > 0){
        const newDate = new Date(updateLog[0].date).toDateString();
        const description = updateLog[0].string;
        return(
            <Notification width='large' title={newDate} message={description} margin={{ bottom: 'medium' }} icon={<CircleInformation/>}/>
        );
    }
};
