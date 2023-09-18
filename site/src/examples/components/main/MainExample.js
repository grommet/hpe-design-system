import React from 'react';
import { Box, Grid } from 'grommet';
import { TextEmphasis } from 'library';

export const MainExample = () => (
  <Grid
    rows={['xxsmall', 'flex', 'xxsmall']}
    columns={['xsmall', 'auto']}
    areas={[
      ['header', 'header'],
      ['main', 'main'],
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
      <TextEmphasis>Header</TextEmphasis>
    </Box>
    <Box
      background="background-contrast"
      border={{ color: 'border', style: 'dashed' }}
      gridArea="main"
      pad="small"
    >
      <TextEmphasis>Main</TextEmphasis>
    </Box>
    <Box
      border={{ color: 'border', style: 'dashed' }}
      gridArea="footer"
      justify="center"
      pad="small"
    >
      <TextEmphasis>Footer</TextEmphasis>
    </Box>
  </Grid>
);
