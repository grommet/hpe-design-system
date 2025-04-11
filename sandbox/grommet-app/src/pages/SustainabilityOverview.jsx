import { Link } from 'react-router-dom';
import { DataChart, Grid, Notification, Skeleton } from 'grommet';
import { DashboardCard } from '../components';
import sustainability from '../mockData/sustainability.json';
import { Metric } from '../components';
import { useContext } from 'react';
import { SkeletonContext } from '../components';

export const SustainabilityOverview = () => {
  const skeleton = useContext(SkeletonContext);
  return (
    <Link to="/sustainability" style={{ textDecoration: 'none' }}>
      <DashboardCard
        title="Sustainability overview"
        level={2}
        footer={
          <Notification
            status="warning"
            message="Your carbon emissions have increased by 83% in the past month."
          />
        }
      >
        <Grid columns={[['min-content', 'auto'], 'flex']} gap="medium">
          <>
            <Metric
              label="Carbon emissions"
              unit="MTCO2e"
              value={132000}
              size="small"
            />
            {skeleton ? (
              <Skeleton height="4xsmall" />
            ) : (
              <DataChart
                data={sustainability.sustainability.slice(0, 10)}
                series={['date', 'emissions']}
                chart={[
                  {
                    property: 'emissions',
                    type: 'area',
                    thickness: '3xsmall',
                    color: { color: 'graph-0', opacity: 'strong' },
                  },
                  {
                    property: 'emissions',
                    type: 'line',
                    thickness: '5xsmall',
                    color: 'graph-0',
                    round: true,
                  },
                ]}
                axis={{
                  x: false,
                  y: false,
                }}
                size={{ height: '5xsmall' }}
              />
            )}
          </>
          <>
            <Metric
              label="Energy consumption"
              unit="kWh"
              value={325000}
              size="small"
            />
            {skeleton ? (
              <Skeleton height="4xsmall" />
            ) : (
              <DataChart
                data={sustainability.sustainability.slice(0, 10)}
                series={['date', 'energy']}
                chart={[
                  {
                    property: 'energy',
                    type: 'area',
                    thickness: '3xsmall',
                    color: { color: 'graph-1', opacity: 'strong' },
                  },
                  {
                    property: 'energy',
                    type: 'line',
                    thickness: '5xsmall',
                    color: 'graph-1',
                    round: true,
                  },
                ]}
                axis={{
                  x: false,
                  y: false,
                }}
                size={{ height: '5xsmall' }}
              />
            )}
          </>
          <>
            <Metric label="Energy cost" unit="USD" value={48750} size="small" />
            {skeleton ? (
              <Skeleton height="4xsmall" />
            ) : (
              <DataChart
                data={sustainability.sustainability.slice(0, 10)}
                series={['date', 'cost']}
                chart={[
                  {
                    property: 'cost',
                    type: 'area',
                    thickness: '3xsmall',
                    color: { color: 'graph-2', opacity: 'strong' },
                  },
                  {
                    property: 'cost',
                    type: 'line',
                    thickness: '5xsmall',
                    color: 'graph-2',
                    round: true,
                  },
                ]}
                axis={{
                  x: false,
                  y: false,
                }}
                size={{ height: '5xsmall' }}
              />
            )}
          </>
        </Grid>
      </DashboardCard>
    </Link>
  );
};
