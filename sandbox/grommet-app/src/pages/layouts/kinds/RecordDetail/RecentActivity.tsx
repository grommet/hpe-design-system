import React from 'react';
import { Anchor, Box, List, Paragraph, Text } from 'grommet';

const recentActivities = [
  {
    title: 'Firmware update',
    description: `Firmware update failed. Recommendation: Retry 
    the firmware update. If the issue persists, open a support case 
    by clicking on the help icon in the UI and select Compute Ops 
    Management - Create case (error code: FWE-110).`,
    datetime: '2025-01-24T09:58:25',
  },
  {
    title: 'Collect hardware inventory',
    description: 'Inventory collection successful',
    datetime: '2025-01-21T08:37:33',
  },
  {
    title: 'Collect hardware inventory',
    description: 'Inventory collection successful',
    datetime: '2025-01-03T18:12:56',
  },
  {
    title: 'Server health',
    description: 'Network health changed to OK',
    datetime: '2025-01-21T14:20:21',
  }, {
    title: 'Server health',
    description: 'Network health changed to OK',
    datetime: '2025-01-21T14:20:21',
  }
].sort((a, b) => {
  return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
});

interface ActivityItemProps {
  title: string;
  description: string;
  datetime: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, datetime }) => {
  return (
    <Box gap='3xsmall'>
      <Text color="text-strong" weight={500}>{title}</Text>
      <Paragraph margin="none">{description}</Paragraph>
      <Text>{Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(datetime))}</Text>
    </Box>
  );
}

export const RecentActivity: React.FC = () => {
  return (
    <Box gap="medium">
      <List
        data={recentActivities}
        defaultItemProps={{ pad: { 'vertical': 'small' } }}
      >
        {datum => (
          <ActivityItem
            title={datum.title}
            description={datum.description}
            datetime={datum.datetime}
          />
        )}
      </List>
      <Anchor label="View all activity" href='#' />
    </Box>
  );
} 
