import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';

export const LastUpdated = ({ date }) => {
  const locales = ['en-US']; // ToDo: Determine need to support multiple locales
  const dateFormat = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const lastUpdate = date.toLocaleDateString(locales, dateFormat);

  return (
    <Text color="text-weak" size="small">
      Updated: {lastUpdate}
    </Text>
  );
};

LastUpdated.propTypes = {
  date: PropTypes.instanceOf(Date),
};
