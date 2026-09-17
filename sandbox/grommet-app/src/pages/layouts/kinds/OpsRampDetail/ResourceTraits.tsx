// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Text, Tag } from 'grommet';

export const ResourceTraits: React.FC = () => (
  <Box gap="small">
    <Text size="small">Traits</Text>
    <Box direction="row" gap="xsmall">
      <Tag onClick={() => {}} value="" name="Other" />
      <Tag onClick={() => {}} value="" name="Gateway is connected" />
    </Box>
  </Box>
);
