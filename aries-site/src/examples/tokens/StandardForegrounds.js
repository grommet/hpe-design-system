import React from 'react';
import { Box, Grid, Text } from 'grommet';
import { Trigger } from 'grommet-icons';
import { ContentPane } from '../../layouts';

export const StandardForegrounds = () => {
  return (
    <Grid columns="medium" gap="medium">
      <ContentPane background="background-contrast">
        {[
          'color.text.default',
          'color.text.strong',
          'color.text.weak',
          'color.text.primary',
          'color.text.critical',
          'color.text.warning',
          'color.text.ok',
          'color.text.info',
          'color.text.unknown',
          'color.text.heading',
        ].map(color => (
          <Box key={color} direction="row" gap='xsmall' pad='xsmall'>
            <Text color={color.split('.').slice(1).join('-')}>Aa</Text> {color}
          </Box>
        ))}
      </ContentPane>
      <ContentPane background="background-contrast">
        {[
          'color.icon.default',
          'color.icon.strong',
          'color.icon.weak',
          'color.icon.primary',
          'color.icon.critical',
          'color.icon.warning',
          'color.icon.ok',
          'color.icon.info',
          'color.icon.unknown',
        ].map(color => (
          <Box key={color} direction="row" gap='xsmall' pad='xsmall'>
            <Trigger
              color={color.split('.').slice(1).join('-')}
              height="medium"
            />{' '}
            {color}
          </Box>
        ))}
      </ContentPane>
    </Grid>
  );
};
