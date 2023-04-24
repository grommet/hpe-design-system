import React from 'react';
import { Box } from 'grommet';
import { TextEmphasis } from 'aries-core';

export const DesignTokens = () => {
  return (
    <Box gap="small">
      <Box direction="row" gap="small">
        <Box background="brand" round="100%" pad="small" />
        <TextEmphasis>color.brand</TextEmphasis>
      </Box>
      <Box direction="row" gap="small">
        <Box background="text-strong" round="100%" pad="small" />
        <TextEmphasis>color.text.strong</TextEmphasis>
      </Box>
    </Box>
  );
};
