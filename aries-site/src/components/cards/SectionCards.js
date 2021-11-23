import React, { useContext } from 'react';
import { Box, Button, Grid, ResponsiveContext } from 'grommet';
import PropTypes from 'prop-types';
import { LinkCard } from './LinkCard';

export const SectionCards = ({ items, seeAllContent }) => {
  const size = useContext(ResponsiveContext);
  const { buttonLabel, href } = seeAllContent;

  return (
    <Box gap="large">
      <Grid
        columns={size !== 'small' ? 'medium' : '100%'}
        rows="auto"
        gap="medium"
      >
        {items.map(item => (
          <LinkCard
            key={item.title}
            title={item.title}
            link={item.link}
            icon={item.icon}
          />
        ))}
      </Grid>
      <Button
        alignSelf="start"
        href={href}
        label={buttonLabel}
        size="large"
        target="_blank"
        rel="noreferrer noopener"
        secondary
      />
    </Box>
  );
};
SectionCards.propTypes = {
  items: PropTypes.array,
  seeAllContent: PropTypes.oneOfType([
    PropTypes.shape({
      buttonLabel: PropTypes.string,
      href: PropTypes.string,
    }),
  ]),
};
