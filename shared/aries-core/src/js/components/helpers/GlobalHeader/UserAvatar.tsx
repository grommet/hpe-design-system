// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Avatar } from 'grommet';
import type { AvatarProps } from 'grommet';

type UserAvatarProps = {
  initials: string;
  size?: AvatarProps['size'];
};

// String children let Avatar apply the theme's avatar.text.size mapping.
export const UserAvatar = ({ initials, size }: UserAvatarProps) => (
  <Avatar
    a11yTitle={`Avatar containing initial letters ${initials}`}
    background="background-accent-purple-weak"
    flex={false}
    size={size}
  >
    {initials}
  </Avatar>
);