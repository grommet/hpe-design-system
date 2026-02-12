import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import {
  StatusCritical,
  StatusWarning,
  StatusGood,
  StatusUnknown,
} from '@hpe-design/icons-grommet';

export const StatusExample = ({ color, hex }) => {
  let Icon;
  if (color.includes('critical')) Icon = StatusCritical;
  else if (color.includes('warning')) Icon = StatusWarning;
  else if (color.includes('ok')) Icon = StatusGood;
  else if (color.includes('unknown')) Icon = StatusUnknown;

  return (
    <Box align="center" gap="xsmall" margin={{ horizontal: 'xsmall' }}>
      <Icon size="xxlarge" color={color} />
      <Box align="center">
        <Text color="text-strong" weight={600} size="small">
          {color}
        </Text>
        <Text color="text" size="small">
          {hex}
        </Text>
      </Box>
    </Box>
  );
};

StatusExample.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
  hex: PropTypes.string,
};
