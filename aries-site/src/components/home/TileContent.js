import React from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Heading, ResponsiveContext } from 'grommet';

export const TileContent = ({ icon, title, subTitle }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        pad="small"
        gap={size === 'small' ? 'large' : 'medium'}
        align="start"
      >
        {icon}
        <Heading level={2} margin="none" responsive={false}>
          {title}
        </Heading>
        <Text size="small">{subTitle}</Text>
      </Box>
    )}
  </ResponsiveContext.Consumer>
);

TileContent.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
