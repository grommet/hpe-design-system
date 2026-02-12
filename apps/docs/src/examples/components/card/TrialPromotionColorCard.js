import React from 'react';
import { Button } from 'grommet';
import { Card } from '../../templates';

export const TrialPromotionColorCard = () => (
  <Card
    background="validation-ok"
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
