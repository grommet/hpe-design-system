// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box } from 'grommet';

export const ContentContainer = ({ ...rest }) => {
  return (
    <Box pad="medium" round="medium" background="background-front" {...rest} />
  );
};
