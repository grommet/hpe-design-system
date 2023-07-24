import {
    Box,
    DataTable,
    Subheading,
    Text,
} from 'grommet';

//NEED TO FIX ACCORDING TO NEW PR METHOD
export const ChangeLog = ({ currentFileName, topic } ) => {
    const updateLog = contributorCommitMessages(topic, currentFileName);
    // console.log(updateLog);
    return(
        <Box>
        {(updateLog.length > 0) && 
            <Box margin={{ bottom: 'large' }}>
                <Subheading>Change Log</Subheading>
            </Box>
        }
        <DataTable 
            columns={[{ property: 'date', header: <Text>Date</Text>, primary: true, size: 'medium' }, { property: 'string', header: 'Change' }]}
            data={updateLog.updateLog}
            border={{ color: 'light-4', side: 'bottom', size: 'xsmall' }}
        />
        </Box>
    );
};
