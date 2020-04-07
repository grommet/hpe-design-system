import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Grid, ResponsiveContext } from 'grommet';

import { ContentCard } from '.';
import { nameToPath } from '../../utils';

export const CardGrid = ({ cards, ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={size !== 'small' ? 'medium' : '100%'}
      rows={[['auto', 'full']]}
      gap="medium"
      justify="center"
      fill
      {...rest}
    >
      {cards &&
        cards.map(topic => (
          <Link key={topic.name} href={nameToPath(topic.name)} passHref>
            <ContentCard
              as="a"
              style={{ textDecoration: 'none' }}
              topic={topic}
            />
          </Link>
        ))}
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
