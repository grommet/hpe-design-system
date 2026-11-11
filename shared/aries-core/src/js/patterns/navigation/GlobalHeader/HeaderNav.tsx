// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import type { ComponentType, PropsWithChildren, ReactNode } from 'react';
import { Box, DropButton, Nav, ResponsiveContext, Text } from 'grommet';
import type { TextProps } from 'grommet';
import { TextEmphasis as UntypedTextEmphasis } from '../../../components/typography/TextEmphasis';
import { useHeaderUser } from './UserContext';
import { UserAvatar } from './UserAvatar';

const TextEmphasis: ComponentType<PropsWithChildren<TextProps>> =
  UntypedTextEmphasis;

type HeaderNavProps = {
  actions?: ReactNode;
  userActions?: ReactNode;
  userMenuLabel: string;
};

export const HeaderNav = ({
  actions,
  userActions,
  userMenuLabel,
}: HeaderNavProps) => {
  const size = useContext(ResponsiveContext);
  const { user } = useHeaderUser();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const initials = `${user.firstName.charAt(0)}${user.lastName?.charAt(0) || ''}`;
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ');

  return (
    <Nav align="center" direction="row" gap="xsmall">
      {!['xsmall', 'small'].includes(size) && actions}
      <DropButton
        a11yTitle={userMenuLabel}
        dropContent={
          <Box width="medium">
            <Box pad="medium" direction="row" gap="xsmall">
              <UserAvatar initials={initials} size="large" />
              <Box pad={{ vertical: 'xsmall' }}>
                <TextEmphasis size="large">{name}</TextEmphasis>
                <Text size="small">{user.email}</Text>
              </Box>
            </Box>
            {userActions && (
              <Box
                border={{ side: 'top', color: 'border-weak' }}
                direction="row"
                align="center"
                justify="between"
                pad={{ horizontal: '3xsmall', vertical: 'xsmall' }}
              >
                {userActions}
              </Box>
            )}
          </Box>
        }
        dropProps={{ align: { top: 'bottom', right: 'right' } }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <UserAvatar initials={initials} />
      </DropButton>
    </Nav>
  );
};
