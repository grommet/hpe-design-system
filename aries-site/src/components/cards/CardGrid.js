import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'grommet';

import { ContentCard } from '.';
import { nameToPath } from '../../utils';

export const CardGrid = ({ cards, headingLevel, minimal, ...rest }) => (
  <Grid
    columns="medium"
    rows={[['auto', 'full']]}
    gap="medium"
    justify="center"
    margin={{ top: 'small' }}
    {...rest}
  >
    {cards &&
      cards.map(topic => {
        const href = topic.href || nameToPath(topic?.name);

        return (
          <ContentCard
            key={topic.name}
            href={href}
            topic={topic}
            minimal={minimal}
            level={headingLevel}
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
  headingLevel: PropTypes.number,
  minimal: PropTypes.bool,
};
