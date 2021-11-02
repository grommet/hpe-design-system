import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { languageData } from '../data';

export const NameValueListBoldExampleBad = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(languageData).map(([name, value]) => (
        <NameValuePair key={name} name={<Text>{name}</Text>}>
          <Text weight="bold">{value}</Text>
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
