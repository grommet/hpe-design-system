import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { serverData } from '../data';

export const NameValueListWeightBadExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(serverData).map(([name, value]) => (
        <NameValuePair key={name} name={<Text weight="bold">{name}</Text>}>
          <Text weight="bold"> {value}</Text>
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
