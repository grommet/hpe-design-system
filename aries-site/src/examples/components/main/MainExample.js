import React from 'react';
import { Box, Grid } from 'grommet';
import { TextEmphasis } from 'aries-core';

export const MainExample = () => (
  <Grid
    rows={['5xsmall', 'flex', '5xsmall']}
    columns={['3xsmall', 'auto']}
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
      pad='xsmall'
    >
      <TextEmphasis>Header</TextEmphasis>
    </Box>
    <Box
      background="background-contrast"
      border={{ color: 'border', style: 'dashed' }}
      gridArea="main"
      pad='xsmall'
    >
      <TextEmphasis>Main</TextEmphasis>
    </Box>
    <Box
      border={{ color: 'border', style: 'dashed' }}
      gridArea="footer"
      justify="center"
      pad='xsmall'
    >
      <TextEmphasis>Footer</TextEmphasis>
    </Box>
  </Grid>
);
