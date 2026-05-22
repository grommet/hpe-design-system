import React from 'react';
import { Box, Button, NameValueList, NameValuePair, Text } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

const stats = [
  { label: 'Capacity', value: '48 TiB' },
  { label: 'Used', value: '31.2 TiB' },
  { label: 'Status', value: 'Online' },
];

export const ButtonSecondaryActionsExample = () => (
  <Box background="background-front" gap="large" pad="medium" round="small">
    <Box gap="small">
      <>
        <Text size="xlarge" weight="bold">
          Storage Array SAA-01
        </Text>
        <Text size="small">Region: US West · Tier: Premium</Text>
      </>
      <NameValueList
        layout="grid"
        pairProps={{ direction: 'column' }}
        nameProps={{ width: { min: '5xsmall', max: 'max-content' } }}
        valueProps={{ width: { min: '5xsmall', max: 'max-content' } }}
      >
        {stats.map(({ label, value }) => (
          <NameValuePair key={label} name={<Text size="small">{label}</Text>}>
            <Text color="text-strong" weight="bold">
              {value}
            </Text>
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
    <ButtonGroup>
      <Button label="Edit resource" onClick={() => {}} primary />
      <Button label="Download" onClick={() => {}} secondary />
      <Button label="Clone" onClick={() => {}} secondary />
    </ButtonGroup>
  </Box>
);
