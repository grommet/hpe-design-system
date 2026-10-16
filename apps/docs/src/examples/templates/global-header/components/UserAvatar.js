// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'grommet';

// String children let Avatar apply the theme's avatar.text.size mapping.
export const UserAvatar = ({ initials, size = 'medium' }) => (
  <Avatar
    a11yTitle={`Avatar containing initial letters ${initials}`}
    background="background-accent-purple-weak"
    flex={false}
    size={size}
  >
    {initials}
  </Avatar>
);

UserAvatar.propTypes = {
  initials: PropTypes.string.isRequired,
  size: PropTypes.string,
};
