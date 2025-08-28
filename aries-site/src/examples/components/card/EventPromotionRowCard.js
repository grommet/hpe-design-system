import React from 'react';
import { Box, Button, Image } from 'grommet';
import { Card } from '../../templates';
import { event } from './data';

export const EventPromotionRowCard = () => {
  const {
    title,
    pretitle,
    subtitle,
    description,
    image: { src, alt, fit },
  } = event;

  return (
    <Card
      direction="row"
      title={title}
      level={2}
      pretitle={pretitle}
      subtitle={subtitle}
      media={
        <Box width='xsmall'>
          <Image src={src} alt={alt} fit={fit} />
        </Box>
      }
      description={description}
      actions={
        <Button
          label="Register now"
          kind="cta-primary"
          reverse
          // tabIndex is -1 because the entire card is clickable
          tabIndex={-1}
        />
      }
      onClick={() => {}}
    />
  );
};
