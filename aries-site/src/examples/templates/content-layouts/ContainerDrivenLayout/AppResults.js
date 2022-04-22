import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Grid, Heading, ResponsiveContext } from 'grommet';

const appGrid = {
  columns: {
    xsmall: 'auto',
    small: ['auto', 'auto'],
    medium: { count: 'fit', size: ['1/2', 'auto'] },
    large: { count: 'fit', size: ['1/3', 'auto'] },
    xlarge: { count: 'fit', size: ['1/4', 'auto'] },
  },
  rows: 'small',
  gap: {
    xsmall: 'medium',
    small: 'small',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  },
};

export const AppResults = ({ apps }) => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box gap="medium">
      <Heading level={2} size="small" margin="none">
        Apps
      </Heading>
      <Grid
        columns={appGrid.columns[breakpoint]}
        rows={appGrid.rows}
        gap={appGrid.gap[breakpoint]}
      >
        {apps?.map(app => (
          <Card key={app.id} fill />
        ))}
      </Grid>
    </Box>
  );
};

AppResults.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object),
};
