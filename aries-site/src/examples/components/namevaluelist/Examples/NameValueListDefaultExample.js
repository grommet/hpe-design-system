import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { defaultData } from '../data';

export const NameValueListDefaultExample = () => (
  <Box pad="small">
    <NameValueList nameProps={{ width: 'xsmall' }}>
      {Object.entries(defaultData).map(([name, value]) => {
        let date;
        if (name === 'Created on') {
          const event = new Date(value);
          date = event.toLocaleString('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          });
        }
        return (
          <NameValuePair key={name} name={name}>
            {name === 'Created on' ? <> {date}</> : value}
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>
);
