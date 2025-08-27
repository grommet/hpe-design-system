import React from 'react';
import { Box, CardBody, Card, DataChart, Heading, Text } from 'grommet';
import sustainability from '../../../../mockData/sustainability.json';

export const Costs = () => (
  <Card onClick={() => {}}>
    <CardBody direction="row" gap="medium" justify="between" align="center">
      <Box gap="xsmall">
        <Heading level={2} margin="none" size="small">
          Costs
        </Heading>
        <Text size="xlarge" weight={500} color="text-strong">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(2960.88)}
        </Text>
        <Text color="text-weak" size="xsmall">
          Month-to-date costs
        </Text>
      </Box>
      <Box width="small">
        <DataChart
          data={sustainability.sustainability.slice(0, 10)}
          series={['date', 'emissions']}
          chart={[
            {
              property: 'emissions',
              type: 'line',
              thickness: 'xxsmall',
              color: 'foreground-primary',
              round: true,
            },
          ]}
          axis={{
            x: false,
            y: false,
          }}
          size={{ height: 'xxsmall' }}
        />
      </Box>
    </CardBody>
  </Card>
);
