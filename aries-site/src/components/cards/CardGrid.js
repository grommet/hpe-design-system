import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, ResponsiveContext } from 'grommet';

import { LinkedCard } from '.';

export const CardGrid = ({ cards, ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={size !== 'small' ? 'medium' : '100%'}
      gap="medium"
      justify="center"
      fill
      {...rest}
    >
      {cards &&
        cards.map(topic => <LinkedCard key={topic.name} topic={topic} />)}
    </Grid>
  );
};

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};
