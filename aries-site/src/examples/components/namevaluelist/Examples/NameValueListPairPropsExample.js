import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { simpleData } from '../data';

export const NameValueListPairPropsExample = () => (
  <Box pad="small">
    <NameValueList pairProps={{ direction: 'column' }}>
      {Object.entries(simpleData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
