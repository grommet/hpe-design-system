import React from 'react';
import { Box, Tag } from 'grommet';
import { Card } from '../../templates';

export const TagAttention = () => {
  return (
    <Box gap="medium">
      <Card
        icon={<Tag value="New" margin={{ bottom: 'xsmall' }} />}
        title="Compute Ops Management"
        subtitle="Compute"
        description={`Securely manage your compute infrastructure
             wherever it is lives.`}
        alignActions="end"
        onClick={() => {}}
        level={3}
      />
    </Box>
  );
};
