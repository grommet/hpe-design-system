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
      // 1536 --> Figma shows 1608 (1536 + 72). I think this should
      // stay at 1536 where the margins are 48 (1440 + 48 + 48) or
      // be modified to be 1536 + 48 + 48
      max: 'xxlarge',
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
      <Box gap={pageContainer.gap[size]} {...rest} />
    </PageContainerContext.Provider>
  );
};

PageContainer.propTypes = {
  kind: PropTypes.oneOf(['full', 'narrow', 'wide']),
};
