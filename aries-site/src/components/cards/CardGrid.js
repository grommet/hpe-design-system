import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Grid, ResponsiveContext } from 'grommet';

import { ContentCard } from '.';
import { nameToPath } from '../../utils';
import { internalLink } from '../../components';

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
        cards.map(topic => {
          const href = nameToPath(topic.name);
          const contentCardProps = {
            /* forwardedAs maintains styling provided by Higher Order 
        Components. Styled-Components 4.3.0 docs: https://styled-components.com/docs/api#forwardedas-prop
        https://github.com/styled-components/styled-components/issues/1981#issuecomment-548860710
        */
            forwardedAs: 'a',
            style: { textDecoration: 'none' },
            topic: topic,
            minimal: minimal,
          };

          return internalLink.test(href) ? (
            <Link key={topic.name} href={href} passHref>
              <ContentCard {...contentCardProps} />
            </Link>
          ) : (
            <ContentCard
              key={topic.name}
              onClick={() => window.open(href)} // open external link in new tab
              {...contentCardProps}
            />
          );
        })}
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
