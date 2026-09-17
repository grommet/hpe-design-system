// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Grid } from 'grommet';
import { EventPromotionCard, NavigationalCardPreview } from '.';

export const CardKitchenSink = () => (
  <Grid align="start" columns={['auto', 'auto']} gap="medium">
    <EventPromotionCard />
    <NavigationalCardPreview />
  </Grid>
);
