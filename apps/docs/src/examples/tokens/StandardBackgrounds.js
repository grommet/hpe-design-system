// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Text } from 'grommet';
import { ContentPane } from '../../layouts';

export const StandardBackgrounds = () => {
  return (
    <ContentPane
      alignSelf="start"
      background="background-contrast"
      margin={{ bottom: 'medium' }}
      gap="xsmall"
      width={{ max: 'medium' }}
    >
      {/* TODO: Replace these placeholder values with surface tokens
      when available. */}
      <Box
        pad="xsmall"
        round="medium"
        background="#ffffff"
        width="xlarge"
      >
        <Text>color.background.surface.base</Text>
      </Box>
      <Box
        pad="xsmall"
        round="medium"
        background="#f5f5f5"
        width="xlarge"
      >
        <Text>color.background.surface.tone.1</Text>
      </Box>
      <Box
        pad="xsmall"
        round="medium"
        background="#ffffff"
        width="xlarge"
      >
        <Text>color.background.surface.tone.2</Text>
      </Box>
      <Box
        pad="xsmall"
        round="medium"
        background="#ffffff"
        width="xlarge"
      >
        <Text>color.background.surface.floating</Text>
      </Box>
    </ContentPane>
  );
};
