import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { fontData } from './data';

export const NameValueListFontWeightExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(fontData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
