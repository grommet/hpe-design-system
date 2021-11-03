import React from 'react';
import { Anchor, Box, NameValueList, NameValuePair } from 'grommet';
import { simpleData } from '../data';

export const NameValueListSimpleExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(simpleData).map(([name, value]) => {
        let date;
        if (name === 'Created on') {
          const event = new Date(value);
          date = event.toLocaleDateString();
        }
        return (
          <NameValuePair key={name} name={name}>
            {name === 'Created by' && (
              <Anchor label={value} href={`mailto:${value}`} />
            )}
            {name === 'Created on' && <>{date}</>}
            {name !== 'Created on' && name !== 'Created by' && <>{value}</>}
          </NameValuePair>
        );
      })}
    </NameValueList>
  </Box>
);
