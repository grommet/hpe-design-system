import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import {
  StatusCriticalSmall,
  StatusWarningSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
} from 'grommet-icons';

export const StatusExample = ({ color, hex }) => {
  let Icon;
  if (color.includes('critical')) Icon = StatusCriticalSmall;
  else if (color.includes('warning')) Icon = StatusWarningSmall;
  else if (color.includes('ok')) Icon = StatusGoodSmall;
  else if (color.includes('unknown')) Icon = StatusUnknownSmall;

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
