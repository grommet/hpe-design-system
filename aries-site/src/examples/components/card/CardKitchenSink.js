import React from 'react';
import { Box, Tabs, Tab } from 'grommet';
import {
  EventPromotionCard,
  TrialPromotionCard,
  ActivitiesNavigationalCards,
} from '.';

export const CardKitchenSink = () => (
  <Tabs alignControls="start">
    <Tab title="Call-to-action">
      <Box
        align="start"
        direction="row"
        gap="medium"
        pad={{ vertical: 'medium' }}
      >
        <EventPromotionCard />
        <TrialPromotionCard />
      </Box>
    </Tab>
    <Tab title="Navigational">
      <Box pad={{ vertical: 'medium' }}>
        <ActivitiesNavigationalCards heading={false} />
      </Box>
    </Tab>
  </Tabs>
);
