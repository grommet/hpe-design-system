import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { anatomyData } from './data';

export const NameValueListAnatomyExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(anatomyData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
