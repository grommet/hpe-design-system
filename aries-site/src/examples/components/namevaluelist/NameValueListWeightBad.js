import React from 'react';
import { Box, NameValueList, NameValuePair, Text } from 'grommet';

const data = {
  Health: 'Healthy',
  State: 'Active',
  ID: 'b3894722-adscb29308478-8032j',
  'API EndPoint': 'democluster1.dev.cloud.net',
  'Default Storage Class': 'Block Storage Cost',
  Description: 'This is a short description of the cluster.',
  Version: '1.18',
  Nodes: '3 Control Plane, 5 workers',
};

export const NameValueListWeightBadExample = () => (
  <Box pad="small">
    <NameValueList>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={<Text weight="bold">{name}</Text>}>
          <Text weight="bold"> {value}</Text>
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);
