import React from 'react';
import { Button } from 'grommet';
import { Card } from '../../templates';

export const CallToActionCard = () => (
  <Card
    title="HPE Discover '22"
    level={2}
    pretitle="Las Vegas, June 28-30, 2022"
    description={`The edge-to-cloud confrence is the best place to stay
       ahead of the trends.`}
    actions={<Button label="Register for Discover '22" primary />}
    width="medium"
  />
);
