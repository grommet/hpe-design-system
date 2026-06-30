import React from 'react';
import { Box, Grid, Text } from 'grommet';
import { ContentPane } from '../../layouts';

export const StandardBackgrounds = () => {
  return (
    <Grid columns="medium" gap="medium">
      <ContentPane background="background-contrast" gap="xsmall">
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
      <ContentPane background="background-contrast" gap="xsmall">
        {/* placeholder colors — replace with tokens when available */}
        <Box
          pad="xsmall"
          round="medium"
          background="#dbeafe"
          width="xlarge"
        >
          <Text>color.background.accent.blue.weak</Text>
        </Box>
        <Box
          pad="xsmall"
          round="medium"
          background="#ede9fe"
          width="xlarge"
        >
          <Text>color.background.accent.purple.weak</Text>
        </Box>
        <Box
          pad="xsmall"
          round="medium"
          background="#cffafe"
          width="xlarge"
        >
          <Text>color.background.accent.cyan.weak</Text>
        </Box>
      </ContentPane>
    </Grid>
  );
};
