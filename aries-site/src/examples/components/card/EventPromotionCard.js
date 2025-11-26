import React from 'react';
import { Box, Button, Image } from 'grommet';
import { Card } from '../../templates';
import { event } from './data';

export const EventPromotionCard = () => {
  const {
    title,
    pretitle,
    subtitle,
    description,
    image: { src, alt, fit },
  } = event;

  return (
    <Card
      title={title}
      level={2}
      pretitle={pretitle}
      subtitle={subtitle}
      media={
        <Box height="xsmall">
          <Image src={src} alt={alt} fit={fit} />
        </Box>
      }
      description={description}
      actions={
        <Button
          label="Register now"
          kind="primary"
          reverse
          // tabIndex is -1 because the entire card is clickable
          tabIndex={-1}
        />
      }
      width="medium"
      onClick={() => {}}
    />
  );
};
