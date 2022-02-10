import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

export const PageContainerContext = createContext({});

// Theme-like object specifying alignment, width, and spacing for
// a PageContainer.
export const pageContainer = {
  wide: {
    align: 'center',
    width: {
      min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
      max: 'xxlarge', // 1536
    },
  },
  narrow: {
    align: 'center',
    width: {
      min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
      max: 'large', // 768
    },
  },
  full: {
    align: 'start',
    width: {
      min: '336px', // 336 + 24 (margin) + 24 (margin) = 384 (e.g. 'medium')
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
    xsmall: { horizontal: 'medium', bottom: 'small' },
    small: { horizontal: 'large', bottom: 'small' },
    medium: { horizontal: 'medium', bottom: 'small' },
    large: { horizontal: 'large', bottom: 'small' },
    xlarge: { horizontal: 'large', bottom: 'small' },
  },
};

export const PageContainer = ({ kind = 'wide', ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
    <PageContainerContext.Provider
      value={{
        alignSelf: pageContainer[kind].align,
        fill: 'horizontal',
        margin: { horizontal: 'auto' },
        width: pageContainer[kind].width,
        pad: pageContainer.pad[size],
      }}
    >
      <Box gap={pageContainer.gap[size]} overflow="horizontal" {...rest} />
    </PageContainerContext.Provider>
  );
};

PageContainer.propTypes = {
  kind: PropTypes.oneOf(['full', 'narrow', 'wide']),
};
