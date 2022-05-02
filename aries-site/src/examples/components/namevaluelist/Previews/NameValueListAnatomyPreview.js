import React, { useContext } from 'react';
import {
  Anchor,
  Box,
  NameValueList,
  NameValuePair,
  ResponsiveContext,
} from 'grommet';
import { anatomyData } from '../data';

export function NameValueListAnatomyPreview() {
  const size = useContext(ResponsiveContext);
  return (
    <Box pad="small">
      <NameValueList
        pairProps={{
          direction:
            size === 'medium' || ['xsmall', 'small'].includes(size)
              ? 'column'
              : 'row',
        }}
      >
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
}
