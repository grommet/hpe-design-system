import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text } from 'grommet';

export const Identifier = ({
  children,
  developer,
  title,
  subTitle,
  size,
  ...rest
}) => (
  <Box align="center" {...rest}>
    {children}
    <Box>
      <Text size={size} weight={developer ? 500 : 'bold'} color="text-strong">
        {title}
      </Text>
      <Text size={size}>{subTitle}</Text>
    </Box>
  </Box>
);

Identifier.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  size: PropTypes.string,
  subTitle: PropTypes.string,
  developer: PropTypes.bool,
};

Identifier.defaultProps = {
  children: undefined,
  size: 'medium',
  subTitle: undefined,
  title: undefined,
};
