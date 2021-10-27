import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { gridData } from './data';

export const NameValueListGridExample = () => (
  <Box pad="small">
    <NameValueList
      pairProps={{ direction: 'column' }}
      layout="grid"
      valueProps={{ width: 'small' }}
    >
      {Object.entries(gridData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
