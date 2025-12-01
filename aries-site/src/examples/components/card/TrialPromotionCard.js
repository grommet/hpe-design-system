import React from 'react';
import { Button } from 'grommet';
import { Card } from '../../templates';

export const TrialPromotionCard = () => (
  <Card
    background={{
      image:
        'url(https://d3hq6blov2iije.cloudfront.net/images/textures/GettyImages-1190757657_800_0_72_RGB+19855.jpg)',
      dark: false,
    }}
    title="Simple, self-service storage made easy with HPE Block Storage"
    description={`HPE Block storage leverages AI-driven cloud management to 
    meet your storage needs for any workload.`}
    level={2}
    actions={
      <Button
        label="Take a test drive"
        kind="primary"
        // tabIndex is -1 because the entire card is clickable
        tabIndex={-1}
      />
    }
    onClick={() => {}}
    width="medium"
  />
);
