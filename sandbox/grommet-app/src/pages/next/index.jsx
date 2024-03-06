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
import { Recommended } from './Recommended';
import { Learn } from './Learn';
import { QuickActions } from './QuickActions';
import { SustainabilityOverview } from './SustainabilityOverview';
import { Notifications } from './Notifications';
import { BillingSummary } from './BillingSummary';
import { RecentServices } from '../RecentServices';
import ContentPane from '../../components/ContentPane';
import { GetStarted } from '../GetStarted';
import { DeviceSummary } from './DeviceSummary';
import { UserOverview } from './UserOverview';
import { ExpiringSubscriptions } from './ExpiringSubscriptions';
import { MonthlyCharges } from './MonthlyCharges';

const Divider = () => <Box border={{ side: 'bottom', color: 'brand' }} />;

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
                />
              }
              pad="none"
            />
            <Box gap="large">
              <ContentPane background="background-contrast" contain>
                <GetStarted heading={false} />
              </ContentPane>
              <Grid
                columns={
                  size === 'xlarge' ? ['flex', 'flex', 'flex'] : ['auto']
                }
                gap="medium"
              >
                <BillingSummary />
                <DeviceSummary />
                <SustainabilityOverview />
              </Grid>
              <RecentServices />
              <Grid
                columns={size === 'xlarge' ? ['medium', 'flex'] : ['auto']}
                gap="medium"
              >
                <UserOverview />
                <Notifications />
              </Grid>
              <Grid
                columns={size === 'xlarge' ? ['flex', 'flex'] : ['auto']}
                gap="medium"
              >
                <MonthlyCharges />
                <ExpiringSubscriptions />
              </Grid>
            </Box>
          </Box>
          <ContentPane alignSelf="start" pad="large">
            <Box gap="large">
              <QuickActions icons />
              <Divider />
              <Recommended inline />
              <Divider />
              <Learn inline />
            </Box>
          </ContentPane>
        </Grid>
      </PageContent>
    </Page>
  );
}

export default Index;
