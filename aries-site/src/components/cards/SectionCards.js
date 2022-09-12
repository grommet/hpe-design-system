import React from 'react';
import { Box, Button, CardBody, Grid, Text } from 'grommet';
import PropTypes from 'prop-types';
import { LinkCard } from './LinkCard';

export const SectionCards = ({ items, seeAllContent }) => {
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
                <Text color="text-strong" weight="bold" size="xlarge">
                  {title}
                </Text>
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
  seeAllContent: PropTypes.oneOfType([
    PropTypes.shape({
      buttonLabel: PropTypes.string,
      href: PropTypes.string,
    }),
  ]),
};
