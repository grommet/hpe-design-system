import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { fontWeightData } from './data';

export const NameValueListFontWeightSecondExample = () => (
  <Box pad="small">
    <NameValueList
      valueProps={{ width: 'xsmall' }}
      pairProps={{ direction: 'column' }}
      layout="grid"
    >
      {Object.entries(fontWeightData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
