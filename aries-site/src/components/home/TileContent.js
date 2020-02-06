import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Box, Heading, Paragraph } from 'grommet';

export const TileContent = forwardRef(({ icon, title, subTitle }, ref) => (
  <Box pad="small" align="start" ref={ref}>
    {icon}
    <Heading level={2} margin={{ bottom: 'small' }} responsive={false}>
      {title}
    </Heading>
    <Paragraph>{subTitle}</Paragraph>
  </Box>
));

TileContent.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
