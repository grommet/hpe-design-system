import React from 'react';
import { NameValueList, NameValuePair } from 'grommet';
import { gridData } from '../data';

export const NameValueListGridExample = () => (
  <NameValueList
    pairProps={{ direction: 'column' }}
    layout="grid"
    valueProps={{ width: 'xsmall' }}
  >
    {Object.entries(gridData).map(([name, value]) => (
      <NameValuePair key={name} name={name}>
        {value}
      </NameValuePair>
    ))}
  </NameValueList>
);
