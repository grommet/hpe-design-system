// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import { Avatar, Box, Button, Grid, ResponsiveContext, Text } from 'grommet';
import { Add } from '@hpe-design/icons-grommet';

export const StrongBackgrounds = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={
        !['xsmall', 'small'].includes(size)
          ? { count: 2, size: 'flex' }
          : undefined
      }
      gap="medium"
    >
      <Box gap="medium">
        <Box
          background="background-neutral-xstrong"
          pad="medium"
          round="xlarge"
          gap="medium"
        >
          <Text color="text-onStrong" size="large" weight={500}>
            color.background.neutral.xstrong
          </Text>
          <Box gap="xsmall">
            <Box direction="row" gap="xsmall">
              <Text color="text-onStrong" weight={500}>
                Aa
              </Text>
              <Text color="text-onStrong">color.text.onStrong</Text>
            </Box>
            <Box direction="row" gap="xsmall">
              <Add aria-hidden="true" color="icon-onStrong" height="medium" />
              <Text color="text-onStrong">color.icon.onStrong</Text>
            </Box>
          </Box>
        </Box>
        <Box
          background="background-contrast"
          pad="medium"
          round="xlarge"
          align="center"
          gap="medium"
        >
          <Text size="large">Badge using strong and onStrong colors.</Text>
          <Button secondary label="Button" badge={2} />
        </Box>
      </Box>
      <Box gap="medium">
        <Box
          background="background-accent-purple-strong"
          pad="medium"
          round="xlarge"
          gap="medium"
        >
          <Text color="text-onStrong" size="large" weight={500}>
            color.background.accent.purple.strong
          </Text>
          <Box gap="xsmall">
            <Box direction="row" gap="xsmall">
              <Text color="text-onStrong" weight={500}>
                Aa
              </Text>
              <Text color="text-onStrong">color.text.onStrong</Text>
            </Box>
            <Box direction="row" gap="xsmall">
              <Add color="icon-onStrong" height="medium" />
              <Text color="text-onStrong">color.icon.onStrong</Text>
            </Box>
          </Box>
        </Box>
        <Box
          background="background-contrast"
          pad="medium"
          round="xlarge"
          align="center"
          gap="medium"
        >
          <Text size="large">Avatar using strong and onStrong colors.</Text>
          <Avatar background="background-accent-purple-strong">
            <Text color="text-onStrong" weight={500}>
              AN
            </Text>
          </Avatar>
        </Box>
      </Box>
    </Grid>
  );
};
