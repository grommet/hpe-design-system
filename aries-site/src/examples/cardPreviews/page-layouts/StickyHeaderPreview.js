import React from 'react';
import { Box, defaultProps } from 'grommet';

export const StickyHeaderPreview = () => {
  return (
    <Box fill direction="row" gap="xsmall">
      <Box
        basis={defaultProps.theme.global.edgeSize.medium}
        background={{ color: { light: 'purple', dark: 'purple!' }, dark: true }}
        round="xsmall"
      />
      <Box fill>
        <Box
          height={defaultProps.theme.global.edgeSize.medium}
          background="green!"
          round={{ corner: 'top', size: 'xsmall' }}
        />
        <Box gap="xsmall" fill>
          <Box
            background="orange"
            round={{ corner: 'bottom', size: 'xsmall' }}
            flex
          />
          <Box
            height={defaultProps.theme.global.edgeSize.medium}
            background={{ color: { light: 'blue', dark: 'blue!' } }}
            round="xsmall"
          />
        </Box>
      </Box>
    </Box>
  );
};
