import React from 'react';
import { Button } from 'grommet';
import { Card } from '../../templates';

export const FeatureReleaseCard = () => (
  <Card
    pretitle="Feature Release"
    title="Unlock the latest features for managing your hybrid cloud"
    description="From ______ to _______, v2.15.0 makes it easier to _______."
    level={2}
    actions={
      <Button
        label="Install now"
        primary
        // tabIndex is -1 because the entire card is clickable
        tabIndex={-1}
      />
    }
    onClick={() => {}}
    width="medium"
  />
);
