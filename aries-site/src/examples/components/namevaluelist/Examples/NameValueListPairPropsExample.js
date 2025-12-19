import React from 'react';
import { Anchor, Box, NameValueList, NameValuePair } from 'grommet';
import { simpleData } from '../data';

export const NameValueListPairPropsExample = () => (
  <Box pad="xsmall">
    <NameValueList pairProps={{ direction: 'column' }}>
      {Object.entries(simpleData).map(([name, value]) => {
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
            {name === 'Created by' && (
              <Anchor label={value} href={`mailto:${value}`} />
            )}
            {name === 'Created on' && date}
            {name !== 'Created on' && name !== 'Created by' && value}
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>
);
