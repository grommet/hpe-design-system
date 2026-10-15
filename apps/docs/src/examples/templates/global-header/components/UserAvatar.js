// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Text } from 'grommet';

export const UserAvatar = ({ initials, size }) => (
  <Avatar
    a11yTitle={`Avatar containing initial letters ${initials}`}
    background="background-accent-purple-weak"
    flex={false}
    size={size}
  >
    <Text size={size === 'large' ? 'xlarge' : 'large'} color="text-strong">
      {initials}
    </Text>
  </Avatar>
);

UserAvatar.propTypes = {
  initials: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['medium', 'large']),
};
