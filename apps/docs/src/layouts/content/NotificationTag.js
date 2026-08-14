// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Tag } from 'grommet';

export const NotificationTag = ({ backgroundColor, ...rest }) => {
  return (
    <Tag
      border={{
        color: 'border-weak',
        size: 'xsmall',
        style: 'solid',
        side: 'all',
      }}
      background={{ dark: true, color: backgroundColor }}
      {...rest}
    />
  );
};

NotificationTag.propTypes = {
  backgroundColor: PropTypes.string,
};
