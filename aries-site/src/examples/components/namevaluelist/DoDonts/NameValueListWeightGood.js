import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { serverData } from '../data';

export const NameValueListWeightGoodExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(serverData).map(([name, value]) => (
        <NameValuePair key={name} name={<Text weight="bold">{name}</Text>}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
