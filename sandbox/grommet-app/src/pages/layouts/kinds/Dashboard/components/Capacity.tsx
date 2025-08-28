import React from 'react';
import { Box, Card, CardBody, CardFooter, Heading, Text, Meter } from 'grommet';

export const Capacity = () => (
  <Card onClick={() => {}}>
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
        size="3xsmall"
      />
      <Box>
        <Heading level={2} margin="none" size="xsmall" weight={400}>
          Capacity
        </Heading>
        <Text size="large" color="text-strong" weight={500}>
          32% used
        </Text>
      </Box>
    </CardBody>
    <CardFooter pad={{ top: 'none', horizontal: 'medium', bottom: 'xsmall' }}>
      <Box
        border={{ side: 'top', color: 'border-weak' }}
        pad={{ top: 'xsmall' }}
        fill="horizontal"
        direction="row"
        gap="3xsmall"
        align="center"
      >
        <Box round background="graph-1" pad="3xsmall" flex={false} />
        <Text>Projected usage by month close (+34%)</Text>
      </Box>
    </CardFooter>
  </Card>
);
