import React from 'react';
import { Anchor, Box, NameValueList, NameValuePair } from 'grommet';

const data = {
  'Created by': (
    <Anchor label="jane.doe@email.com" href="mailto:jane.doe@email.com" />
  ),
  'Created on': '13/02/2021 at 14:23:32',
  Description: `Privilege escalation, such as via set-user-ID or
     set-group-ID file mode, should not be allowed.`,
};

export const NameValueListPairPropsExample = () => (
  <Box pad="small">
    <NameValueList pairProps={{ direction: 'column' }}>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
