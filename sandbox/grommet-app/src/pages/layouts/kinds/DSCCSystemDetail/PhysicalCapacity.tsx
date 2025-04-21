import React from 'react';
import { Box, Grid, Meter, Text } from 'grommet';
import { DashboardCard, Metric } from '../../../../components';

export const PhysicalCapacity = ({ size, ...rest }) => {
  return (
    <DashboardCard
      title="Physical capacity"
      subtitle={null}
      level={2}
      hideCta
      icon={null}
      external={null}
      footer={null}
      inline={null}
      onClick={null}
      {...rest}
    >
      <Grid
        gap="xsmall"
        areas={[
          ['metric', 'summary'],
          ['meter', 'meter'],
        ]}
        columns={['flex', 'flex']}
        rows={['auto']}
      >
        <Metric
          gridArea="metric"
          label={null}
          value="47%"
          unit="used"
          options={null}
          reverse
          size={size}
        />
        <Meter
          gridArea="meter"
          max={100}
          values={[{ value: 34 }, { value: 13 }]}
          size="full"
          thickness="xsmall"
          round
        />
        <Box gridArea="summary" justify="end">
          <Text
            size={
              ['xsmall', 'small', 'medium'].includes(size) ? 'small' : 'medium'
            }
          >
            <Text color="text-strong" weight={500}>
              131.5
            </Text>{' '}
            of 281.1 TiB
          </Text>
        </Box>
      </Grid>
    </DashboardCard>
  );
};
