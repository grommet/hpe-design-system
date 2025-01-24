import React from 'react';
import { NameValueList, NameValuePair } from 'grommet';
import { sentenceCase } from '../../../../utils/format';

const groupDetails = {
  status: 'Okay',
  state: 'Job in progress',
  group: 'Group name',
  servers: 2,
  baseline: 'SPP 2022.09.04(04 Sep 2022)',
  power: 'On',
};

const nameProps = {
  width: ['xsmall', 'max-content']
};

export const DetailSummary: React.FC = () => {
  return (
    <NameValueList nameProps={nameProps}>
      {Object.entries(groupDetails).map(([name, value]) => (
        <NameValuePair
          key={name}
          name={sentenceCase(name)}
        >
          {sentenceCase(value)}
        </NameValuePair>
      ))}
    </NameValueList>
  );
}
