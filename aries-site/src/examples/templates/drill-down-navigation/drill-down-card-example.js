import React from 'react';
import { NameValueList, NameValuePair } from 'grommet';

const cardData = {
  Cards: 'Groups with a distinct navigational purpose to a Hub or Spoke',
  Hub: 'A central index where activities can begin',
  Actions: 'Routes where tasks can be performed',
  Spoke: 'Visible details that pertain to the List Item',
};

export function DrillDownCardExample() {
  return <NameValueList
    pairProps={{ direction: 'column' }}
    layout="grid"
    valueProps={{ width: 'small' }}
  >
    {Object.entries(cardData).map(([name, value]) => (
      <NameValuePair key={name} name={name}>
        {value}
      </NameValuePair>
    ))}
  </NameValueList>;
}
