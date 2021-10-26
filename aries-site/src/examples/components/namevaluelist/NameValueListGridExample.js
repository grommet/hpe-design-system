import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';

const data = {
  Description: 'Whether to enable email link user authentication',
  'Ephemeral Storage': '54.7%  (3000 GB of 5489 GB)',
  'Kubernetes Verison': '19.7',
  'IP Address': '172.98.09182.98.00.1.2567',
  'Created On': '13/02/2021 at 14:23:32',
};

export const NameValueListGridExample = () => (
  <Box pad="small">
    <NameValueList
      pairProps={{ direction: 'column' }}
      layout="grid"
      valueProps={{ width: 'small' }}
    >
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
