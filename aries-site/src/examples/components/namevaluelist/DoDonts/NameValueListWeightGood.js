import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { StatusGood } from '@hpe-design/icons-grommet';
import { serverData } from '../data';

export const NameValueListWeightGoodExample = () => (
  <Box pad="xsmall">
    <NameValueList>
      {Object.entries(serverData).map(([name, value]) => {
        let val = value;
        if (name === 'Health') {
          val = (
            <Box direction="row" gap="3xsmall" align="center">
              <StatusGood size="small" color="status-ok" />
              {value}
            </Box>
          );
        }
        return (
          <NameValuePair key={name} name={name}>
            {val}
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>
);
