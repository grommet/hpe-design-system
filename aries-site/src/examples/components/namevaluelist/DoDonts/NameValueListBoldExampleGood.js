import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { languageData } from '../data';

export const NameValueListBoldExampleGood = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(languageData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
