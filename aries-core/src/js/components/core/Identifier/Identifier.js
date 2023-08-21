import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text } from 'grommet';

export const Identifier = ({
  children,
  level,
  title,
  subTitle,
  size,
  type,
  ...rest
}) => {
  return (
    <Box align="center" {...rest}>
      {children}
      <Box direction="row" align="center" justify="center" gap="xsmall">
        {level ? (
          <Heading level={level} margin="none">
            {title}
          </Heading>
        ) : (
          <Text size={size} weight="bold" color="text-strong">
            {title}
          </Text>
        )}
        <Text size={size}>{subTitle}</Text>
      </Box>
    </Box>
  );
};

Identifier.propTypes = {
  children: PropTypes.node,
  level: PropTypes.number,
  title: PropTypes.string,
  size: PropTypes.string,
  subTitle: PropTypes.string,
};

Identifier.defaultProps = {
  children: undefined,
  level: undefined,
  size: 'medium',
  subTitle: undefined,
  title: undefined,
};
