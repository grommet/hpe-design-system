import React from 'react';
import { Grid, Box, Card, CardBody, Text, Heading, Meter } from 'grommet';
import { Legend } from '../../../../components';

export const Usage = () => (
  <Card>
    <CardBody gap="small">
      <Box direction="row" justify="between">
        <Heading level={2} margin="none">
          Usage
        </Heading>
        <Text size="large" weight={500} color="text-strong">
          89%
        </Text>
      </Box>
      <Box round alignSelf="start" overflow="hidden">
        <Meter
          values={[
            { value: 30, color: 'graph-0' },
            { value: 20, color: 'graph-1' },
            { value: 15, color: 'graph-2' },
            { value: 10, color: 'graph-3' },
            { value: 7, color: 'graph-4' },
            { value: 3, color: 'graph-5' },
          ]}
          background="background-contrast"
          max={100}
        />
      </Box>
      <Grid columns={['flex', 'flex']} gap="xsmall">
        <Legend color="graph-0" label="MySQL" />
        <Legend color="graph-1" label="VMware" />
        <Legend color="graph-2" label="NAS" />
        <Legend color="graph-3" label="File Servers" />
        <Legend color="graph-4" label="Disaster Recovery" />
        <Legend color="graph-5" label="Other" />
      </Grid>
    </CardBody>
  </Card>
);
