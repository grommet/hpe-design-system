import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Paragraph } from 'grommet';

export const EmptyState = ({
  actions,
  align,
  description,
  icon,
  level,
  title,
}) => {
  return (
    <Box gap="medium" align={align || 'center'} flex={false}>
      {icon}
      <Box align={align || 'center'} gap="xsmall">
        <Heading margin="none" level={level}>
          {title}
        </Heading>
        <Paragraph margin="none" textAlign={align || 'center'}>
          {description}
        </Paragraph>
      </Box>

      {actions}
    </Box>
  );
};

EmptyState.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  align: PropTypes.oneOf(['start']),
  description: PropTypes.string,
  icon: PropTypes.element,
  level: PropTypes.number,
  title: PropTypes.string,
};
