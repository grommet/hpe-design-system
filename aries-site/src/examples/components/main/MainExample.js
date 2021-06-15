import React from 'react';
import { Box, Grid, Text } from 'grommet';

export const MainExample = () => (
  <Grid
    rows={['xxsmall', 'flex', 'xxsmall']}
    columns={['xsmall', 'auto']}
    areas={[
      ['header', 'header'],
      ['sidebar', 'main'],
      ['footer', 'footer'],
    ]}
    fill
  >
    <Box
      border={{ color: 'border', style: 'dashed' }}
      gridArea="header"
      justify="center"
      pad="small"
    >
      <Text weight="bold">Header</Text>
    </Box>

    <Box
      border={{ color: 'border', style: 'dashed' }}
      gridArea="sidebar"
      pad="small"
    >
      <Text weight="bold">Sidebar</Text>
    </Box>

    <Box
      background="background-contrast"
      border={{ color: 'border', style: 'dashed' }}
      gridArea="main"
      pad="small"
    >
      <Text weight="bold">Main</Text>
    </Box>

    <Box
      border={{ color: 'border', style: 'dashed' }}
      gridArea="footer"
      justify="center"
      pad="small"
    >
      <Text weight="bold">Footer</Text>
    </Box>
  </Grid>
);
