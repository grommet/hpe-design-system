import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

const data = {
  Health: (
    <Box gap="xsmall" direction="row">
      <StatusGoodSmall color="status-ok" />
      Healthy
    </Box>
  ),
  State: 'Active',
  ID: 'b3894722-adscb29308478-8032j',
  'API EndPoint': 'democluster1.dev.cloud.net',
  'Default Storage Class': 'Block Storage Cost',
  Description: 'This is a short description of the cluster.',
  Version: '1.18',
  Nodes: '3 Control Plane, 5 workers',
};

export const NameValueListWeightGoodExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={<Text weight="bold">{name}</Text>}>
          {value}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
