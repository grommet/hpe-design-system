import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Grid, ResponsiveContext } from 'grommet';

import { ContentCard } from '.';
import { nameToPath } from '../../utils';

export const CardGrid = ({ cards, minimal, ...rest }) => {
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
              /* forwardedAs maintains styling provided by Higher Order 
              Components. Styled-Components 4.3.0 docs: https://styled-components.com/docs/api#forwardedas-prop
              https://github.com/styled-components/styled-components/issues/1981#issuecomment-548860710
              */
              forwardedAs="a"
              style={{ textDecoration: 'none' }}
              topic={topic}
              minimal={minimal}
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
  minimal: PropTypes.bool,
};
