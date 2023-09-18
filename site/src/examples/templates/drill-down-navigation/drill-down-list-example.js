import React from 'react';
import { NameValueList, NameValuePair } from 'grommet';

const cardData = {
  'List Items': 'Content panels with a navigational purpose',
  Hub: 'A central index where activities can begin',
  Actions: 'Routes where tasks can be performed',
  Spoke: 'Visible details that pertain to the List Item',
};

export const DrillDownListExample = () => (
  <NameValueList
    pairProps={{ direction: 'column' }}
    layout="grid"
    valueProps={{ width: 'small' }}
  >
    {Object.entries(cardData).map(([name, value]) => (
      <NameValuePair key={name} name={name}>
        {value}
      </NameValuePair>
    ))}
  </NameValueList>
);
