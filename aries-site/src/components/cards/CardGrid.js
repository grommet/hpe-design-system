import React, { Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Grid } from 'grommet';

import { ContentCard } from '.';
import { nameToPath } from '../../utils';
import { internalLink } from '..';

export const CardGrid = ({ cards, minimal, ...rest }) => (
  <Grid
    columns="medium"
    rows={[['auto', 'full']]}
    gap="medium"
    justify="center"
    fill
    {...rest}
  >
    {cards &&
      cards.map(topic => {
        const href = topic.href || nameToPath(topic.name);
        const isInternalLink = internalLink.test(href);
        const Wrapper = isInternalLink ? Link : Fragment;
        const wrapperProps = isInternalLink && {
          href,
          passHref: true,
        };

        return (
          <Wrapper key={topic.name} {...wrapperProps}>
            <ContentCard
              as="a"
              style={{ textDecoration: 'none' }}
              topic={topic}
              minimal={minimal}
              target={!isInternalLink ? '_blank' : undefined}
              // if internal link, href comes from Link wrapper
              href={!isInternalLink ? href : undefined}
            />
          </Wrapper>
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
