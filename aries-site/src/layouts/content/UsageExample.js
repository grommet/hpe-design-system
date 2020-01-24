import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Text } from 'grommet';

import { colors } from '../../themes/aries';

export const UsageExample = ({ children, label, themeMode, pad, ...rest }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box gap="xsmall" margin={{ vertical: 'xsmall' }}>
      <Text weight={400} size="small">
        {label}
      </Text>
      {/* Because UsageExamples need to present content in both light and dark
      contexts, regardless of the site's themeMode, forcing box background to 
      serve examples with the desired themeMode */}
      <Box background={colors.background[themeMode]}>
        <Box
          direction="row"
          background={colors['background-front']}
          pad={size === 'small' ? pad.small : pad}
          {...rest}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

UsageExample.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  label: PropTypes.string,
  themeMode: PropTypes.oneOf(['dark', 'light']),
  pad: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      top: PropTypes.string,
      bottonm: PropTypes.string,
      left: PropTypes.string,
      right: PropTypes.string,
      horizontal: PropTypes.string,
      vertical: PropTypes.string,
    }),
  ]),
};

UsageExample.defaultProps = {
  pad: {
    horizontal: 'large',
    vertical: 'large',
    small: { horizontal: 'xlarge', vertical: 'xlarge' },
  },
  label: undefined,
  themeMode: undefined,
};
