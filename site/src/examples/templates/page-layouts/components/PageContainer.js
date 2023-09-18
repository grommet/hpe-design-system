import { createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

export const PageContainerContext = createContext({});

// Theme-like object specifying alignment, width, and spacing for a
// PageContainer. This implementation will be replaced by Grommet <Page />
// PR: https://github.com/grommet/grommet/pull/5960 and by the HPE theme.
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
    xsmall: { horizontal: 'medium', bottom: 'medium' },
    small: { horizontal: 'large', bottom: 'medium' },
    medium: { horizontal: 'medium', bottom: 'medium' },
    large: { horizontal: 'large', bottom: 'medium' },
    xlarge: { horizontal: 'large', bottom: 'medium' },
  },
};

// This implementation will be replaced by Grommet <Page /> PR: https://github.com/grommet/grommet/pull/5960.
export const PageContainer = ({ kind = 'wide', ...rest }) => {
  const size = useContext(ResponsiveContext);

  const contextValue = useMemo(
    () => ({
      alignSelf: pageContainer[kind].align,
      fill: 'horizontal',
      margin: { horizontal: 'auto' },
      width: pageContainer[kind].width,
      pad: pageContainer.pad[size],
    }),
    [kind, size],
  );

  return (
    <PageContainerContext.Provider value={contextValue}>
      <Box gap={pageContainer.gap[size]} overflow="horizontal" {...rest} />
    </PageContainerContext.Provider>
  );
};

PageContainer.propTypes = {
  kind: PropTypes.oneOf(['full', 'narrow', 'wide']),
};
