// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Anchor } from 'grommet';

interface RoutedAnchorProps extends React.ComponentProps<typeof Anchor> {
  to: string;
}

export const RoutedAnchor = ({ ...rest }: RoutedAnchorProps) => (
  <Anchor {...rest} />
);
