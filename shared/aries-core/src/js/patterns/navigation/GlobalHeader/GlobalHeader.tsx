// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { Header, ResponsiveContext } from 'grommet';

type GlobalHeaderProps = Omit<
  ComponentProps<typeof Header>,
  'children'
> & {
  identity: ReactNode;
  navigation?: ReactNode;
};

export const GlobalHeader = ({
  identity,
  navigation,
  ...rest
}: GlobalHeaderProps) => {
  const size = useContext(ResponsiveContext);
  return (
    <Header
      align="center"
      background="background"
      justify="between"
      fill="horizontal"
      pad={{
        horizontal: !['xsmall', 'small'].includes(size) ? 'medium' : 'xsmall',
        vertical: 'xsmall',
      }}
      {...rest}
    >
      {identity}
      {navigation}
    </Header>
  );
};
