import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { StatusGood } from '@hpe-design/icons-grommet';
import { sentenceCase } from '../../../../utils/format';

const groupDetails = {
  status: {
    value: 'Okay',
    render: () => (
      <Box direction="row" gap="xsmall" align="center">
        <StatusGood color="status-ok" />
        <Text>Okay</Text>
      </Box>
    ),
  },
  state: 'Job in progress',
  group: 'Server group name',
  servers: 2,
  baseline: 'SPP 2022.09.04(04 Sep 2022)',
  power: 'On',
};

const nameProps = {
  width: ['xsmall', 'max-content'],
};

export const DetailSummary: React.FC = () => {
  return (
    <NameValueList nameProps={nameProps}>
      {Object.entries(groupDetails).map(([name, value]) => (
        <NameValuePair key={name} name={sentenceCase(name)}>
          {typeof value === 'object' && 'render' in value
            ? value.render()
            : sentenceCase(value.toString())}
        </NameValuePair>
      ))}
    </NameValueList>
  );
};
