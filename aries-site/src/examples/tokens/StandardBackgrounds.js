import React from 'react';
import { Box, Text } from 'grommet';
import { ContentPane } from '../../layouts';

export const StandardBackgrounds = () => {
  return (
    <ContentPane
      alignSelf="start"
      background="background-contrast"
      margin={{ bottom: 'medium' }}
      gap="small"
      width={{ max: 'medium' }}
    >
      <Box pad="small" round="small" background="background-back" width="large">
        <Text>color.background.back</Text>
      </Box>
      <Box
        pad="small"
        round="small"
        background="background-default"
        width="large"
      >
        <Text>color.background.default</Text>
      </Box>
      <Box
        pad="small"
        round="small"
        background="background-front"
        width="large"
      >
        <Text>color.background.front</Text>
      </Box>
      <Box
        pad="small"
        round="small"
        background="background-contrast"
        width="large"
      >
        <Text>color.background.contrast</Text>
      </Box>
      <Box
        pad="small"
        round="small"
        background="background-floating"
        width="large"
      >
        <Text>color.background.floating</Text>
      </Box>
    </ContentPane>
  );
};
