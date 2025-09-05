import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { fontWeightData } from '../data';

export const NameValueListFontWeightSecondPreview = () => (
  <Box pad='xsmall'>
    <NameValueList
      valueProps={{ width: 'xsmall' }}
      pairProps={{ direction: 'column' }}
      layout="grid"
    >
      {Object.entries(fontWeightData).map(([name, value]) => (
        <NameValuePair key={name} name={<Text>{name}</Text>}>
          <Text weight="bold" size="xxlarge">{value}</Text>
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
