import { useState } from 'react';
import { Anchor, List, Grid, Text, Box, Button, Skeleton } from 'grommet';
import { Link } from 'react-router-dom';
import services from '../mockData/services.json';
import { Apps, List as ListIcon } from 'grommet-icons';
import { Card } from '../components';
import ContentPane from '../components/ContentPane';
import { useLoading, skeleton as skeletonAnimation } from '../utils/skeleton';

const dates = [
  '2024-02-28T20:04:00.000Z',
  '2024-03-30T17:25:00.000Z',
  '2024-03-10T19:37:00.000Z',
  '2024-03-04T23:14:00.000Z',
  '2024-03-02T20:19:00.000Z',
];

export const RecentServices = () => {
  const [cards, setCards] = useState(false);
  const recentServices = services.services.slice(0, 5);
  const skeleton = useLoading(1000);

  return (
    <ContentPane
      heading="Recent services"
      level={2}
      actions={
        <Box direction="row" gap='xsmall' align="center">
          <Button
            icon={cards ? <ListIcon /> : <Apps />}
            onClick={() => setCards(!cards)}
          />
          <Anchor href="#" label="My services" />
        </Box>
      }
    >
      <Box
        skeleton={skeleton ? skeletonAnimation : undefined}
        animation={!skeleton ? 'fadeIn' : undefined}
      >
        {cards ? (
          <Grid columns='xsmall' gap="medium">
            {recentServices.map(service => (
              <Card
                key={service.name}
                title={service.name}
                subtitle={service.category}
                description={service.description}
                level={3}
                actions={<Button label="Launch" secondary />}
              />
            ))}
          </Grid>
        ) : (
          <List
            data={recentServices}
            defaultItemProps={{
              border: { color: 'border-weak', side: 'bottom' },
              pad: { vertical: 'xsmall', horizontal: 'none' },
            }}
          >
            {datum => (
              <Grid
                columns={['flex', 'flex', 'flex', 'auto']}
                align={skeleton ? 'start' : 'center'}
                gap='xsmall'
              >
                <Box>
                  <Text weight={500} color="text-strong">
                    {datum.name}
                  </Text>
                </Box>
                <Box>
                  <Text>{datum.category}</Text>
                </Box>
                <Box>
                  <Text>
                    {Intl.DateTimeFormat(undefined, {
                      timeStyle: 'short',
                      dateStyle: 'medium',
                    }).format(
                      new Date(dates[Math.floor(Math.random() * dates.length)]),
                    )}
                  </Text>
                </Box>
                {skeleton ? (
                  <Skeleton fill="vertical" width='3xsmall' />
                ) : (
                  <Link to={datum.href}>
                    <Button
                      label="Launch"
                      a11yTitle={`Launch ${datum.name}`}
                      secondary
                    />
                  </Link>
                )}
              </Grid>
            )}
          </List>
        )}
      </Box>
    </ContentPane>
  );
};
