import React from 'react';
import { Box, Button, Heading } from 'grommet';
import { Card } from '../../templates';

export const FeaturePromotionCard = () => (
  <Card
    background="white"
    pretitle="Feature update"
    title={
      <Box
        background={{
          image: `linear-gradient(
      45deg,
      hsl(281deg 100% 63%) 1%,
      hsl(227deg 83% 58%) 50%,
      hsl(174deg 69% 53%) 99%
    );`,
          clip: 'text',
        }}
      >
        <Heading level={2} margin="none">
          GreenLake Cloud Platform announces new ML Ops service
        </Heading>
      </Box>
    }
    actions={
      <Button
        label="Launch demo"
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
