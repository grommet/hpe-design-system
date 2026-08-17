// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Paragraph } from 'grommet';

export const Genie = ({ ...rest }) => {
  return (
    <Box {...rest}>
      <Paragraph>My genie content</Paragraph>
    </Box>
  );
};
