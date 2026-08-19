// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Text } from 'grommet';

export const TextEmphasis = ({ ...rest }) => {
  return <Text weight={500} color="text-strong" {...rest} />;
};
