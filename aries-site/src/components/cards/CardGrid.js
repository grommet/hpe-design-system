import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'grommet';

import { ContentCard } from '.';
import { nameToPath } from '../../utils';

export const CardGrid = ({ cards, minimal, ...rest }) => (
  <Grid
    columns="medium"
    rows={[['auto', 'full']]}
    gap="medium"
    justify="center"
    {...rest}
  >
    {cards &&
      cards.map(topic => {
        const href = topic.href || nameToPath(topic.name);

        return (
          <ContentCard
            key={topic.name}
            id={`card-${topic.name}`}
            href={href}
            topic={topic}
            minimal={minimal}
          />
        );
      })}
  </Grid>
);

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
  minimal: PropTypes.bool,
};
