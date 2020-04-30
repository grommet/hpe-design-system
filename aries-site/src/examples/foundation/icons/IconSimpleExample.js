import React from 'react';
import { Box } from 'grommet';
import { Schedules, Schedule, ScheduleNew } from 'grommet-icons';

export const IconSimpleExample = () => {
  return (
    <Box direction="row-responsive" gap="medium">
      <Schedule />
      <Schedules />
      <ScheduleNew />
    </Box>
  );
};
