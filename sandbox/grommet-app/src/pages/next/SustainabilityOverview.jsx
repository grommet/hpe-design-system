import { Link } from 'react-router-dom';
import { DataChart, Grid, Notification, Skeleton } from 'grommet';
import { DashboardCard } from '../../components';
import sustainability from '../../mockData/sustainability.json';
import { Metric } from '../../components';
import { useContext } from 'react';
import { SkeletonContext } from '../../components';

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
              <Skeleton height="xxsmall" />
            ) : (
              <DataChart
                data={sustainability.sustainability.slice(0, 10)}
                series={['date', 'emissions']}
                chart={[
                  {
                    property: 'emissions',
                    type: 'area',
                    thickness: 'xsmall',
                    color: 'chart-qualitative-70-weak',
                  },
                  {
                    property: 'emissions',
                    type: 'line',
                    thickness: 'xxsmall',
                    color: 'chart-qualitative-70',
                    round: true,
                  },
                ]}
                axis={{
                  x: false,
                  y: false,
                }}
                size={{ height: 'xxsmall' }}
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
              <Skeleton height="xxsmall" />
            ) : (
              <DataChart
                data={sustainability.sustainability.slice(0, 10)}
                series={['date', 'energy']}
                chart={[
                  {
                    property: 'energy',
                    type: 'area',
                    thickness: 'xsmall',
                    color: 'chart-qualitative-20-weak',
                  },
                  {
                    property: 'energy',
                    type: 'line',
                    thickness: 'xxsmall',
                    color: 'chart-qualitative-20',
                    round: true,
                  },
                ]}
                axis={{
                  x: false,
                  y: false,
                }}
                size={{ height: 'xxsmall' }}
              />
            )}
          </>
          <>
            <Metric label="Energy cost" unit="USD" value={48750} size="small" />
            {skeleton ? (
              <Skeleton height="xxsmall" />
            ) : (
              <DataChart
                data={sustainability.sustainability.slice(0, 10)}
                series={['date', 'cost']}
                chart={[
                  {
                    property: 'cost',
                    type: 'area',
                    thickness: 'xsmall',
                    color: 'chart-qualitative-30-weak',
                  },
                  {
                    property: 'cost',
                    type: 'line',
                    thickness: 'xxsmall',
                    color: 'chart-qualitative-30',
                    round: true,
                  },
                ]}
                axis={{
                  x: false,
                  y: false,
                }}
                size={{ height: 'xxsmall' }}
              />
            )}
          </>
        </Grid>
      </DashboardCard>
    </Link>
  );
};