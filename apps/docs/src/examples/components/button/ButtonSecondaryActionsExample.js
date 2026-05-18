import React from 'react';
import { Box, Button, Text } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

const stats = [
  { label: 'Capacity', value: '48 TiB' },
  { label: 'Used', value: '31.2 TiB' },
  { label: 'Status', value: 'Online' },
];

export const ButtonSecondaryActionsExample = () => (
  <Box align="center" fill justify="center" pad="medium">
    <Box
      background="background-front"
      gap="medium"
      pad="medium"
      round="small"
      width="large"
    >
      <Box gap="xsmall">
        <Text size="large" weight="bold">
          Storage Array SAA-01
        </Text>
        <Text color="text-weak" size="small">
          Region: US West · Tier: Premium
        </Text>
      </Box>
      <Box direction="row" gap="large">
        {stats.map(({ label, value }) => (
          <Box key={label} gap="xsmall">
            <Text color="text-weak" size="small">
              {label}
            </Text>
            <Text weight="bold">{value}</Text>
          </Box>
        ))}
      </Box>
      <ButtonGroup>
        <Button
          label="Edit resource"
          onClick={() => {}}
          primary
        />
        <Button
          label="Download"
          onClick={() => {}}
          secondary
        />
        <Button
          label="Clone"
          onClick={() => {}}
          secondary
        />
      </ButtonGroup>
    </Box>
  </Box>
);
