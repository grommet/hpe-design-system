import React from "react";
import {
  Box,
  Heading,
  HeadingExtendedProps,
  Text
} from "grommet";
import { JobList } from "./JobList";

const scheduledJobs = [
  {
    id: "1",
    name: "Update firmware",
    date: "2025-08-23T13:00:00Z",
    "scheduled baseline": `Gen11 Patch 2025.07.00.03 + SPP 2025.07.00.00 (01 Jul 2025)`,
    "current baseline": `Gen11 SPP 2025.07.00.00 (01 Jul 2025)`,
    servers: [
      'MXQ30505W4',
      'MXQ30505W5',
      'MXQ30505W6',
      'MXQ30505W7',
      'MXQ30505W8',
      'MXQ30505W9',
    ],
  },
];

const pendingJobs = [];

export const ScheduledJobs = (
  { level: levelProp = 2 }:
    { level: HeadingExtendedProps['level'] }
) => {
  const level = (typeof levelProp === 'number' ? levelProp : levelProp && parseInt(levelProp, 10)) + 1;

  return (
    <Box gap="medium">
      <Heading
        level={level as 1 | 2 | 3 | 4 | 5 | 6}
        margin="none"
      >
        Scheduled
      </Heading>
      {scheduledJobs.length >= 1 ?
        <JobList jobs={scheduledJobs} /> :
        <Text>No jobs are scheduled.</Text>
      }
      <Heading
        level={level as 1 | 2 | 3 | 4 | 5 | 6}
        margin="none"
      >
        Pending queue
      </Heading>
      {pendingJobs.length >= 1 ?
        <JobList jobs={pendingJobs} /> :
        <Text>No jobs are pending.</Text>
      }
    </Box>
  );
}
