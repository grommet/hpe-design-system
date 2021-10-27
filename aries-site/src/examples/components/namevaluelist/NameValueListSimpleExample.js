import React from 'react';
import { Anchor, Box, NameValueList, NameValuePair } from 'grommet';

const data = {
  'Created On': '13/02/2021 at 14:23:32',
  'Created by': (
    <Anchor label="jane.doe@email.com" href="mailto:jane.doe@email.com" />
  ),
  'Default Storage Class': 'Block Storage Cost',
  Description: `Full-service AI insights, security and unified infrastructure 
  management for campus, branch, remote, and data center networks`,
  'IP Address': '172.98.09182.98.00.1.2567',
};

export const NameValueListSimpleExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
