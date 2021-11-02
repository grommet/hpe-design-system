import React from 'react';
import { Anchor, Box, NameValueList, NameValuePair } from 'grommet';
import { anatomyData } from '../data';

export const NameValueListAnatomyPreview = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(anatomyData).map(([name, value]) => (
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
