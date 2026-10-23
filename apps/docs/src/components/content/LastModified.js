// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';
import { useRouter } from 'next/router';
import mdxLastModified from '../../data/generated/mdxLastModified.json';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export const LastModified = ({
  margin = { top: 'none', bottom: 'medium' },
}) => {
  const { pathname } = useRouter();
  const timestamp = mdxLastModified[pathname];

  // Only MDX routes have modification metadata.
  if (!timestamp) return null;

  return (
    <Text
      as="p"
      size="small"
      color="text-weak"
      margin={margin}
    >
      Last modified:{' '}
      <time dateTime={timestamp}>{dateFormat.format(new Date(timestamp))}</time>
    </Text>
  );
};

LastModified.propTypes = {
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
