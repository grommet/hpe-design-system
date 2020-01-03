import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Heading, Paragraph, Box, ResponsiveContext } from 'grommet';

export const DescriptiveHeader = ({ subText, icon, title, ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      fill
      gap="large"
      pad={{ vertical: 'large' }}
      direction={size !== 'small' ? 'row' : 'column'}
      {...rest}
    >
      {icon(size !== 'small' ? 'xxlarge' : 'xlarge')}
      <Box>
        <Heading level={1} margin={{ vertical: 'none' }}>
          {title}
        </Heading>
        <Paragraph>{subText}</Paragraph>
      </Box>
    </Box>
  );
};

DescriptiveHeader.propTypes = {
  icon: PropTypes.func,
  subText: PropTypes.string,
  title: PropTypes.string,
};
