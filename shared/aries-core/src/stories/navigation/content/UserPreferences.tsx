// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Paragraph } from 'grommet';

export const UserPreferences = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Paragraph>My user preferences content</Paragraph>
    </Box>
  );
};
