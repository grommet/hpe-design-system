import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, ResponsiveContext } from 'grommet';

export const HorizontalExample = ({
  content,
  controls,
  plain,
  resources,
  showResponsiveControls,
  width,
}) => {
  const size = useContext(ResponsiveContext);

  const grid = {
    columns: {
      xsmall: 'auto',
      small: 'auto',
      medium: 'auto',
      large: ['auto', 'flex'],
      xlarge: ['auto', 'flex'],
    },
    gap: ['large', 'xlarge'].includes(size) ? 'large' : 'small',
  };

  return (
    <Grid columns={grid.columns[size]} gap={grid.gap}>
      <Box
        // let content maintain its defined width
        flex={false}
        // when plain, keep spacing between content and
        // responsiveControls to align with code block to its right
        margin={
          plain && showResponsiveControls
            ? {
                top: 'xsmall',
                bottom: !['xsmall', 'small'].includes(size)
                  ? 'medium'
                  : undefined,
              }
            : // on small screens, gap from outer box handles spacing
              {
                bottom: !['xsmall', 'small'].includes(size)
                  ? 'medium'
                  : undefined,
              }
        }
        width={width}
      >
        {content}
      </Box>
      <Box width={{ min: 'medium' }}>
        {resources}
        {controls}
      </Box>
    </Grid>
  );
};

HorizontalExample.propTypes = {
  content: PropTypes.node,
  controls: PropTypes.node,
  plain: PropTypes.bool,
  resources: PropTypes.node,
  showResponsiveControls: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
