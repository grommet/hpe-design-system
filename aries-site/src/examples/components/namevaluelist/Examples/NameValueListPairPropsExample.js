import React from 'react';
import { Anchor, Box, NameValueList, NameValuePair } from 'grommet';
import { simpleData } from '../data';

export const NameValueListPairPropsExample = () => (
  <Box pad="small">
    <NameValueList pairProps={{ direction: 'column' }}>
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
