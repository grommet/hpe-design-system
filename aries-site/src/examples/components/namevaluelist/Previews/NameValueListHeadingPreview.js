import React from 'react';
import { Anchor, Box, Heading, NameValueList, NameValuePair } from 'grommet';
import { simpleData } from '../data';

export const NameValueListHeadingPreview = () => (
  <Box pad="small">
    <Heading level={2} size="small">
      Name Value List Heading
    </Heading>
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
