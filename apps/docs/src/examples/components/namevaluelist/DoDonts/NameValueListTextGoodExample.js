import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { data } from '../data';

export const NameValueListTextGoodExample = () => (
  <Box pad="xsmall">
    <NameValueList nameProps={{ width: '5xsmall' }}>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={<Text size="xsmall">{name}</Text>}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
