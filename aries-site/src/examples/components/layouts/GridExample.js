import React from 'react';
import { Box, Grid, Text } from 'grommet';
import { UsageExample } from '../../../layouts';

export const GridExample = () => {
  return (
    <UsageExample>
      <Grid
        rows={['xxsmall', 'small', 'xxsmall']}
        columns={['1/4', '3/4']}
        areas={[
          ['header', 'header'],
          ['sidebar', 'main'],
          ['footer', 'footer'],
        ]}
        gap="small"
        fill
      >
        <Box background="green" gridArea="header" justify="center" pad="small">
          <Text weight="bold">Header</Text>
        </Box>

        <Box background="yellow" gridArea="sidebar" pad="small">
          <Text weight="bold">Sidebar</Text>
        </Box>

        <Box background="blue" gridArea="main" pad="small">
          <Text weight="bold">Main</Text>
        </Box>

        <Box background="green" gridArea="footer" justify="center" pad="small">
          <Text weight="bold">Footer</Text>
        </Box>
      </Grid>
    </UsageExample>
  );
};
