import React from 'react';
import { Box, defaultProps } from 'grommet';

export const SidebarHeaderFooterPreview = () => {
  return (
    <Box fill direction="row" gap="xsmall">
      <Box
        basis={defaultProps.theme.global.edgeSize.medium}
        background={{ color: { light: 'purple', dark: 'purple!' }, dark: true }}
        round="xsmall"
      />
      <Box fill gap="xsmall">
        <Box
          height={defaultProps.theme.global.edgeSize.medium}
          background="green!"
          round="xsmall"
        />
        <Box background="orange" round="xsmall" flex />
        <Box
          height={defaultProps.theme.global.edgeSize.medium}
          background={{ color: { light: 'blue', dark: 'blue!' } }}
          round="xsmall"
        />
      </Box>
    </Box>
  );
};
