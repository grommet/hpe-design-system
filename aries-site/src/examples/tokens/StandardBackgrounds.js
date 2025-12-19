import React from 'react';
import { Box, Text } from 'grommet';
import { ContentPane } from '../../layouts';

export const StandardBackgrounds = () => {
  return (
    <ContentPane
      alignSelf="start"
      background="background-contrast"
      margin={{ bottom: 'medium' }}
      gap="xsmall"
      width={{ max: 'medium' }}
    >
      <Box
        pad="xsmall"
        round="medium"
        background="background-back"
        width="xlarge"
      >
        <Text>color.background.back</Text>
      </Box>
      <Box
        pad="xsmall"
        round="medium"
        background="background-default"
        width="xlarge"
      >
        <Text>color.background.default</Text>
      </Box>
      <Box
        pad="xsmall"
        round="medium"
        background="background-front"
        width="xlarge"
      >
        <Text>color.background.front</Text>
      </Box>
      <Box
        pad="xsmall"
        round="medium"
        background="background-contrast"
        width="xlarge"
      >
        <Text>color.background.contrast</Text>
      </Box>
      <Box
        pad="xsmall"
        round="medium"
        background="background-floating"
        width="xlarge"
      >
        <Text>color.background.floating</Text>
      </Box>
    </ContentPane>
  );
};
