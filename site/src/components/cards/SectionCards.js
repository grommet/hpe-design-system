import React from 'react';
import { Box, Button, CardBody, Heading, Grid } from 'grommet';
import PropTypes from 'prop-types';
import { LinkCard } from './LinkCard';

export const SectionCards = ({ items, headingLevel, seeAllContent }) => {
  const { buttonLabel, href } = seeAllContent;

  return (
    <Box gap="large">
      <Grid columns="medium" rows="auto" gap="medium">
        {items.map(({ title, link, icon }) => {
          const Icon = icon;
          return (
            <LinkCard key={title} href={link}>
              <CardBody direction="row" gap="small">
                <Box
                  pad="small"
                  justify="center"
                  round="small"
                  background="background-back"
                  flex={false}
                >
                  <Icon size="large" />
                </Box>
                <Heading level={headingLevel} margin="none">
                  {title}
                </Heading>
              </CardBody>
            </LinkCard>
          );
        })}
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
  headingLevel: PropTypes.number,
  seeAllContent: PropTypes.oneOfType([
    PropTypes.shape({
      buttonLabel: PropTypes.string,
      href: PropTypes.string,
    }),
  ]),
};
