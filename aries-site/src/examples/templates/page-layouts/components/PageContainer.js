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
  children: {
    pad: {
      xsmall: { horizontal: 'medium' },
      small: { horizontal: 'large' },
      medium: { horizontal: 'medium' },
      large: { horizontal: 'large' },
      xlarge: { horizontal: 'large' },
    },
  },
};

export const PageContainer = ({ kind = 'wide', ...rest }) => {
  const size = useContext(ResponsiveContext);
  const pad = pageContainer.children.pad[size];

  return (
    <PageContainerContext.Provider value={{ pad }}>
      <Box
        alignSelf={pageContainer[kind].align}
        fill
        gap={pageContainer.gap[size]}
        margin="auto"
        width={pageContainer[kind].width}
        {...rest}
      />
    </PageContainerContext.Provider>
  );
};

PageContainer.propTypes = {
  kind: PropTypes.oneOf(['full', 'narrow', 'wide']),
};
