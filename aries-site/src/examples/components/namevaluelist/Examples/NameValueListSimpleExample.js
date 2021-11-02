import React from 'react';
import { Anchor, Box, NameValueList, NameValuePair } from 'grommet';
import { simpleData } from '../data';

export const NameValueListSimpleExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(simpleData).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {name === 'Created by' ? (
            <Anchor label={value} href={`mailto:${value}`} />
          ) : (
            <>{value}</>
          )}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
