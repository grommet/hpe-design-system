import { useContext } from 'react';
import {
  Box,
  PageHeader,
  Page,
  PageContent,
  Button,
  Grid,
  ResponsiveContext,
} from 'grommet';
import { Configure } from 'grommet-icons';
import { DashboardCard } from '../components';
import { Recommended } from './Recommended';
import { Learn } from './Learn';
import { QuickActions } from './QuickActions';
import { MyServices } from './MyServices';
import { SustainabilityOverview } from './SustainabilityOverview';
import { Notifications } from './Notifications';

function Index() {
  const size = useContext(ResponsiveContext);
  return (
    <Page pad={{ bottom: 'large', top: 'medium' }}>
      <PageContent gap="medium">
        <Grid
          columns={
            ['xlarge', 'large', 'medium'].includes(size)
              ? ['flex', 'medium']
              : ['auto']
          }
          gap="large"
        >
          <Box gap="medium">
            <PageHeader
              title="Home"
              actions={
                <Button
                  label="Customize"
                  icon={<Configure color="brand" />}
                  reverse
                  kind="subtle"
                />
              }
              pad="none"
            />
            <Grid
              columns={size === 'xlarge' ? ['flex', 'flex'] : ['auto']}
              gap="medium"
            >
              <MyServices />
              <SustainabilityOverview />
            </Grid>
            <Notifications />
            <Grid
              columns={size === 'xlarge' ? ['flex', 'flex'] : ['auto']}
              gap="medium"
            >
              <DashboardCard title="Wireless clients" level={2} />
              <DashboardCard title="Device summary" level={2} />
            </Grid>
          </Box>
          <Box gap="medium">
            <QuickActions />
            <Recommended />
            <Learn />
          </Box>
        </Grid>
      </PageContent>
    </Page>
  );
}

export default Index;
