import React from 'react';
import { Box, Card, CardBody, CardFooter, Text, Meter } from 'grommet';

export const Capacity = () => (
  <Card>
    <CardBody direction="row" gap="medium" align="center">
      <Meter
        type="pie"
        max={100}
        values={[
          {
            value: 30,
            color: 'graph-0',
          },
          {
            value: 20,
            color: 'graph-1',
          },
          {
            value: 50,
            color: 'background-contrast',
          },
        ]}
        size="xsmall"
      />
      <Box>
        <Text>Capacity</Text>
        <Text size="large" color="text-strong" weight={500}>
          32% used
        </Text>
      </Box>
    </CardBody>
    <CardFooter pad={{ top: 'none', horizontal: 'medium', bottom: 'small' }}>
      <Box
        border={{ side: 'top', color: 'border-weak' }}
        pad={{ top: 'small' }}
        fill="horizontal"
        direction="row"
        gap="xsmall"
        align="center"
      >
        <Box round background="graph-1" pad="xsmall" flex={false} />
        <Text>Projected usage by month close (+34%)</Text>
      </Box>
    </CardFooter>
  </Card>
);
