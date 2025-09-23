import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Paragraph } from 'grommet';

export const EmptyState = ({
  actions,
  align = 'center',
  description,
  icon: iconProp,
  level,
  title,
}) => {
  let icon = iconProp;
  if (iconProp && !iconProp.props.size)
    icon = cloneElement(iconProp, {
      size: 'xxlarge',
    });

  return (
    <Box gap="medium" align={align} flex={false}>
      {icon}
      <Box align={align} gap="3xsmall">
        <Heading margin="none" level={level}>
          {title}
        </Heading>
        <Paragraph margin="none" textAlign={align}>
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
  align: PropTypes.oneOf(['start', 'center']),
  description: PropTypes.string,
  icon: PropTypes.element,
  level: PropTypes.number,
  title: PropTypes.string,
};
