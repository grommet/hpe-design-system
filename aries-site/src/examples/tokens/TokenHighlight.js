import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';

const parts = [
  'prefix',
  'level',
  'type',
  'component',
  'size',
  'element',
  'variant',
  'state',
  'scale',
  'property',
];

export const TokenHighlight = ({ highlight }) => {
  return (
    <Text size="large">
      {parts.map((part, index) => (
        <>
          <Text
            size="large"
            color={
              highlight === 'all' || highlight?.includes(part)
                ? 'purple!'
                : 'text-weak'
            }
            key={part}
          >
            [{part}]
          </Text>
          {index < parts.length - 1 ? ' . ' : ''}
        </>
      ))}
    </Text>
  );
};

TokenHighlight.propTypes = {
  highlight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};
