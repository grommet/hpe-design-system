import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';
import { serverData } from '../data';

export const NameValueListWeightBadExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(serverData).map(([name, value]) => {
        let val = value;
        if (name === 'Health') {
          val = (
            <Box direction="row" gap="xsmall" align="center">
              <StatusGoodSmall size="small" color="status-ok" />
              {value}
            </Box>
          );
        }
        return (
          <NameValuePair key={name} name={<Text weight="bold">{name}</Text>}>
            <Text weight="bold">{val}</Text>
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>
);
