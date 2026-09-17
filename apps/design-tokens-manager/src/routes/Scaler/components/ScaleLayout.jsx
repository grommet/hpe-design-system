// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box } from 'grommet';

export const ScaleLayout = ({ ...rest }) => {
  return (
    <Box
      direction="row"
      align="end"
      alignSelf="start"
      gap="medium"
      wrap
      {...rest}
    />
  );
};
