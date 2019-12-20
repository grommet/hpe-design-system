import React from 'react';
import PropTypes from 'prop-types';

import { Heading, Paragraph, Box } from 'grommet';

export const DescriptiveHeader = ({ subText, icon, title, ...rest }) => {
  return (
    <Box fill direction="row" gap="large" pad={{ vertical: 'large' }} {...rest}>
      {icon('xxlarge')}
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
