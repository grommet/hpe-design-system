// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box } from 'grommet';

export const TagAppContainer = ({ ...rest }) => (
  <Box
    gap="xlarge"
    fill
    margin="auto"
    overflow="auto"
    pad="medium"
    width={{ max: '3xlarge' }}
    {...rest}
  />
);
