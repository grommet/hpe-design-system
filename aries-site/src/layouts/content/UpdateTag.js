import { Anchor, Text, Notification } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import { ViewContext } from '../../pages/_app';
import { useContext } from 'react';

export const UpdateTag = ({name}) => {
    const {wholeViewHistory} = useContext(ViewContext) || undefined;
        if(wholeViewHistory && name in wholeViewHistory){
            return (
                <>
                {(wholeViewHistory[name].type === "Update") &&
                    <Notification width='large'
                    title={"Updated " + new Date(wholeViewHistory[name].date).toDateString()} 
                    message={
                        <>
                        <Text>{wholeViewHistory[name].description + "    "}
                        {wholeViewHistory[name].action.length > 1 && 
                            <Anchor label='Link' href={wholeViewHistory[name].action}/> 
                        }
                        </Text>
                        </>
                    } 
                    margin={{ bottom: 'medium' }} icon={<CircleInformation/>}
                    />
                }
                {(wholeViewHistory[name].type === "New") &&
                    <Notification width='large'
                    title={"Added on " + new Date(wholeViewHistory[name].date).toDateString()} 
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
        }
};
