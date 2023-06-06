import React from 'react';
import { Grid } from 'grommet';
import { EventPromotionCard, NavigationalCardPreview } from '.';

export const CardKitchenSink = () => (
  <Grid align="start" columns={['auto', 'auto']} gap="medium">
    <EventPromotionCard />
    <NavigationalCardPreview />
  </Grid>
);
