import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { simpleData } from './data';

export const NameValueListSimpleExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(simpleData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
