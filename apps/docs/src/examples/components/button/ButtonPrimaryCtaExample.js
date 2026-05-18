import React from 'react';
import { Box, Button, PageHeader } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

export const ButtonPrimaryCtaExample = () => (
  <Box fill pad="medium">
    <Box width="large">
      <PageHeader
        title="GreenLake Monitoring"
        subtitle="Enable health and performance monitoring
          for your GreenLake platform resources."
        actions={
          <ButtonGroup>
            <Button
              label="Activate service"
              onClick={() => {}}
              primary
            />
            <Button
              label="View details"
              onClick={() => {}}
            />
            <Button
              label="Schedule"
              onClick={() => {}}
            />
          </ButtonGroup>
        }
      />
    </Box>
  </Box>
);
