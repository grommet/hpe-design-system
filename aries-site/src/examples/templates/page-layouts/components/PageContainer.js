import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

// Theme-like object specifying alignment, width, and spacing for
// a PageContainer.
const pageContainer = {
  wide: {
    align: 'center',
    width: {
      max: 'xxlarge', // 1536 --> needs to adjust to 1536 + 72
    },
  },
  narrow: {
    align: 'center',
    width: {
      max: 'large', // 768
    },
  },
  full: {
    align: 'start',
    width: {
      max: '100%',
    },
  },
  gap: {
    xsmall: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'medium',
    xlarge: 'medium',
  },
  pad: {
    xsmall: { horizontal: 'medium', vertical: 'medium' },
    small: { horizontal: 'large', vertical: 'medium' },
    medium: { horizontal: 'medium', vertical: 'medium' },
    large: { horizontal: 'large', vertical: 'medium' },
    xlarge: { horizontal: 'large', vertical: 'medium' },
  },
};

export const PageContainer = ({ kind = 'wide', ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      alignSelf={pageContainer[kind].align}
      fill
      gap={pageContainer.gap[size]}
      margin="auto"
      pad={{ vertical: pageContainer.pad[size].vertical }}
      width={pageContainer[kind].width}
      {...rest}
    />
  );
};

PageContainer.propTypes = {
  kind: PropTypes.oneOf(['full', 'narrow', 'wide']),
};
