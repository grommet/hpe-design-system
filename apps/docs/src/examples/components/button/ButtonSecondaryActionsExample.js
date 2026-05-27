import React, { useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  NameValueList,
  NameValuePair,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

const stats = [
  { label: 'Capacity', value: '48 TiB' },
  { label: 'Used', value: '31.2 TiB' },
  { label: 'Status', value: 'Online' },
];

export const ButtonSecondaryActionsExample = () => {
  const size = useContext(ResponsiveContext);
  const mobileLayout = ['xsmall', 'small'].includes(size);

  return (
    <Box align="center" fill justify="center" pad="medium">
      <Box
        background="background-front"
        gap="medium"
        pad="medium"
        round="small"
        width="large"
      >
        <Box gap="xsmall">
          <Heading level={3} margin="none">
            Storage Array SAA-01
          </Heading>
          <Text color="text-weak" size="small">
            Region: US West · Tier: Premium
          </Text>
        </Box>
        <NameValueList
          valueProps={{ width: '4xsmall' }}
          pairProps={{ direction: 'column' }}
          layout="grid"
        >
          {stats.map(({ label, value }) => (
            <NameValuePair key={label} name={<Text>{label}</Text>}>
              <Text weight="bold">{value}</Text>
            </NameValuePair>
          ))}
        </NameValueList>
        <ButtonGroup direction={mobileLayout ? 'column' : 'row'}>
          <Button label="Edit resource" primary />
          <Button label="Download" secondary />
          <Button label="Clone" secondary />

        </ButtonGroup>
      </Box>
    </Box>
  );
};
