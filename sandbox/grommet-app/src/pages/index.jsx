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
import { RecentServices } from './RecentServices';
import ContentPane from '../components/ContentPane';
import { GetStarted } from './GetStarted';
import { DeviceSummary } from './DeviceSummary';
import { UserOverview } from './UserOverview';
import { ExpiringSubscriptions } from './ExpiringSubscriptions';
import { MonthlyCharges } from './MonthlyCharges';
import { SkeletonContext } from '../components';
import { skeleton as skeletonAnimation, useLoading } from '../utils/skeleton';

const Divider = () => <Box border={{ side: 'bottom', color: 'border-weak' }} />;

function Home() {
  const size = useContext(ResponsiveContext);
  const getStartedLoading = useLoading(250);
  const insightsLoading = useLoading(2000);
  const sidePanelLoading = useLoading(250);
  return (
    <Page pad={{ top: 'xlarge', bottom: 'xlarge' }}>
      <PageContent gap="medium">
        <Grid
          columns={
            ['xlarge', 'large', 'medium'].includes(size)
              ? ['flex', 'medium']
              : ['auto']
          }
          gap="xlarge"
        >
          <Box gap="medium">
            <PageHeader
              title="Home"
              actions={
                <Button label="Customize" icon={<Configure />} reverse />
              }
              pad="none"
            />
            <Box gap="xlarge" animation="fadeIn">
              <Box skeleton={getStartedLoading ? skeletonAnimation : undefined}>
                <SkeletonContext.Provider
                  value={getStartedLoading ? skeletonAnimation : undefined}
                >
                  <GetStarted kind="next" />
                </SkeletonContext.Provider>
              </Box>
              <Box skeleton={insightsLoading ? skeletonAnimation : undefined}>
                <SkeletonContext.Provider
                  value={insightsLoading ? skeletonAnimation : undefined}
                >
                  <Grid
                    columns={
                      size === 'xlarge' ? ['flex', 'flex', 'flex'] : ['auto']
                    }
                    gap="large"
                  >
                    <BillingSummary />
                    <DeviceSummary />
                    <SustainabilityOverview />
                  </Grid>
                </SkeletonContext.Provider>
              </Box>
              <RecentServices />
              <Box
                skeleton={insightsLoading ? skeletonAnimation : undefined}
                gap="large"
              >
                <SkeletonContext.Provider
                  value={insightsLoading ? skeletonAnimation : undefined}
                >
                  <Grid
                    columns={size === 'xlarge' ? ['medium', 'flex'] : ['auto']}
                    gap="large"
                  >
                    <UserOverview />
                    <Notifications />
                  </Grid>
                  <Grid
                    columns={size === 'xlarge' ? ['flex', 'flex'] : ['auto']}
                    gap="large"
                  >
                    <MonthlyCharges />
                    <ExpiringSubscriptions />
                  </Grid>
                </SkeletonContext.Provider>
              </Box>
            </Box>
          </Box>
          <ContentPane alignSelf="start" pad="xlarge" animation="fadeIn">
            <SkeletonContext.Provider
              value={sidePanelLoading ? skeletonAnimation : undefined}
            >
              <Box gap="xlarge">
                <QuickActions icons />
                <Divider />
                <Recommended inline />
                <Divider />
                <Learn inline />
              </Box>
            </SkeletonContext.Provider>
          </ContentPane>
        </Grid>
      </PageContent>
    </Page>
  );
}

export default Home;
