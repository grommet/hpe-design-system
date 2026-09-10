// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Paragraph } from 'grommet';

export const Help = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Paragraph>My help content</Paragraph>
    </Box>
  );
};
