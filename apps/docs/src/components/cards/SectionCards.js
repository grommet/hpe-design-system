import React from 'react';
import { Box, Button, CardBody, Heading, Grid } from 'grommet';
import PropTypes from 'prop-types';
import { LinkCard } from './LinkCard';

export const SectionCards = ({
  items,
  headingLevel,
  seeAllContent,
  headingSize,
}) => {
  const { buttonLabel, href } = seeAllContent;

  return (
    <Box gap="xlarge">
      <Grid columns="medium" rows="auto" gap="medium">
        {items.map(({ title, link, icon }) => {
          const Icon = icon;
          return (
            <LinkCard key={title} href={link}>
              <CardBody direction="row" gap="xsmall">
                <Box
                  pad="xsmall"
                  justify="center"
                  round="medium"
                  background="background-back"
                  flex={false}
                >
                  <Icon size="large" />
                </Box>
                <Heading size={headingSize} level={headingLevel} margin="none">
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
  headingSize: PropTypes.string,
  seeAllContent: PropTypes.oneOfType([
    PropTypes.shape({
      buttonLabel: PropTypes.string,
      href: PropTypes.string,
    }),
  ]),
};
