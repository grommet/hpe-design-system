import { Anchor, Text, Notification } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const UpdateTag = ({name}) => {
    const history = JSON.parse(window.localStorage.getItem("update-history"));
    let newUpdate;
    if(name in history){
      newUpdate = history[name].update;
    }else{
      newUpdate = false;
    }
    let link = history[name].action;
    return(
        <>
        {newUpdate && 
            <Notification width='large'
            title={new Date(history[name].date).toDateString()} 
            message={
                <>
                <Text>{history[name].description}</Text>
                {history[name].action && 
                    <Anchor label='See section here' href={link}/> 
                    //WARNING!! depending on what the devs tell us, this is assuming they give us a link to the section
                    //this will re-route them to the actual HPE site and not the local host so it's a little funky right now on a localHost
                    //another way we could do an action button: they give us the name of the section changed, and i write a little function
                    //to turn it into proper href formatting and I can take them there from that
                    //however, this would rely on the devs perfect spelling/spacing of the title for it to work properly
                    //and i think accuracy is more achievable from a link
                }
                </>
            } 
            margin={{ bottom: 'medium' }} icon={<CircleInformation/>}
            />
        }
        </>
    );
};
