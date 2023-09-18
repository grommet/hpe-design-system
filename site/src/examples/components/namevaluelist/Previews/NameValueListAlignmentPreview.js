import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { alignmentData } from '../data';

export const NameValueListAlignmentPreview = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(alignmentData).map(([name, value]) => {
        let date;
        if (name === 'Created on') {
          const event = new Date(value);
          date = event.toLocaleDateString();
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
