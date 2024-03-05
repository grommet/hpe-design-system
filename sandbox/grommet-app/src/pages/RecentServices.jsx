import { useState } from 'react';
import { Anchor, List, Grid, Text, Box, Button } from 'grommet';
import { Link } from 'react-router-dom';
import services from '../mockData/services.json';
import { Apps, List as ListIcon } from 'grommet-icons';
import { Card } from '../components';
import ContentPane from '../components/ContentPane';

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

  return (
    <ContentPane
      heading="Recent services"
      level={2}
      actions={
        <Box direction="row" gap="small" align="center">
          <Button
            icon={cards ? <ListIcon /> : <Apps />}
            onClick={() => setCards(!cards)}
          />
          <Anchor href="#" label="My services" />
        </Box>
      }
    >
      {cards ? (
        <Grid columns="small" gap="medium">
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
            pad: { vertical: 'small', horizontal: 'none' },
          }}
        >
          {datum => (
            <Grid
              columns={['flex', 'flex', 'flex', 'auto']}
              align="center"
              gap="small"
            >
              <Box>
                <Text weight={500} color="text-strong">
                  {datum.name}
                </Text>
              </Box>
              <Box>
                <Text>{datum.category}</Text>
              </Box>
              <Text>
                {Intl.DateTimeFormat(undefined, {
                  timeStyle: 'short',
                  dateStyle: 'medium',
                }).format(
                  new Date(dates[Math.floor(Math.random() * dates.length)]),
                )}
              </Text>
              <Link to={datum.href}>
                <Button
                  label="Launch"
                  a11yTitle={`Launch ${datum.name}`}
                  secondary
                />
              </Link>
            </Grid>
          )}
        </List>
      )}
    </ContentPane>
  );
};
