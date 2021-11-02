import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { defaultData } from '../data';

export const NameValueListDefaultExample = () => (
  <Box pad="small">
    <NameValueList nameProps={{ width: 'xsmall' }}>
      {Object.entries(defaultData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          <Text color="text-strong">{value}</Text>
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
