import {
  Box,
  PageHeader,
  Page,
  PageContent,
  Button,
  Grid,
  ResponsiveContext,
} from 'grommet';
import { Configure } from '@hpe-design/icons-grommet';
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
import { CustomizableGrid, CustomizeHeader, SkeletonContext } from '../components';
import { skeleton as skeletonAnimation, useLoading } from '../utils/skeleton';
import { useState } from 'react';

const sizeToSpan = {
  '1x1': { gridColumn: 'span 1', gridRow: 'span 1' },
  '1x2': { gridColumn: 'span 1', gridRow: 'span 2' },
  '1x3': { gridColumn: 'span 1', gridRow: 'span 3' },
  '2x1': { gridColumn: 'span 2', gridRow: 'span 1' },
  '2x2': { gridColumn: 'span 2', gridRow: 'span 2' },
  '2x3': { gridColumn: 'span 2', gridRow: 'span 3' },
  '3x1': { gridColumn: 'span 3', gridRow: 'span 1' },
  '3x2': { gridColumn: 'span 3', gridRow: 'span 2' },
  '3x3': { gridColumn: 'span 3', gridRow: 'span 3' },
};
const resizeOptions = Object.keys(sizeToSpan);

const Divider = () => <Box border={{ side: 'bottom', color: 'border-weak' }} />;

function Home() {
  const getStartedLoading = useLoading(250);
  const insightsLoading = useLoading(2000);
  const sidePanelLoading = useLoading(250);

  const [customizeOpen, setCustomizeOpen] = useState(false);

  const [widgets, setWidgets] = useState([
    { id: 'billingSummary', component: <BillingSummary /> },
    { id: 'deviceSummary', component: <DeviceSummary /> },
    { id: 'sustainabilityOverview', component: <SustainabilityOverview /> },
  ]);

  return (
    <>
      {customizeOpen && (
        <CustomizeHeader
          onCancel={() => setCustomizeOpen(false)}
          onSave={() => setCustomizeOpen(false)}
          onAddWidget={() => { }}
        />
      )}
    <Page pad={{ top: 'large', bottom: 'xlarge' }}>
      <PageContent gap="medium" responsive="container">
        <ResponsiveContext.Consumer>
          {size => (
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
                    actions={!customizeOpen ?
                      <Button label="Customize" icon={<Configure />} reverse
                        onClick={() => setCustomizeOpen(!customizeOpen)}
                      />
                      : undefined
                    }
                  pad="none"
                />
               
                <Box gap="large" animation="fadeIn">
                  <Box
                    skeleton={getStartedLoading ? skeletonAnimation : undefined}
                  >
                    <SkeletonContext.Provider
                      value={getStartedLoading ? skeletonAnimation : undefined}
                    >
                      <GetStarted kind="next" />
                    </SkeletonContext.Provider>
                  </Box>
                  <Box
                    skeleton={insightsLoading ? skeletonAnimation : undefined}
                  >
                    <SkeletonContext.Provider
                      value={insightsLoading ? skeletonAnimation : undefined}
                    >
                      <CustomizableGrid
                        columns={
                          size === 'xlarge'
                            ? ['flex', 'flex', 'flex']
                            : ['auto']
                        }
                        gap="medium"
                        data={widgets}
                        onOrder={customizeOpen ? setWidgets : undefined}
                        onResize={(id, size) => {
                          console.log('resize', id, size);
                          const nextWidgets = widgets.map(widget => (
                            widget.id === id ? {
                              ...widget,
                              size: size?.size,
                              sizeProps: sizeToSpan[size?.size],
                            } : widget

                          ));
                          setWidgets(nextWidgets);
                        }}
                        resizeOptions={resizeOptions}
                      />
                    </SkeletonContext.Provider>
                  </Box>
                  <RecentServices />
                  <Box
                    skeleton={insightsLoading ? skeletonAnimation : undefined}
                    gap="medium"
                  >
                    <SkeletonContext.Provider
                      value={insightsLoading ? skeletonAnimation : undefined}
                    >
                      <Grid
                        columns={
                          size === 'xlarge' ? ['medium', 'flex'] : ['auto']
                        }
                        gap="medium"
                      >
                        <UserOverview />
                        <Notifications />
                      </Grid>
                      <Grid
                        columns={
                          size === 'xlarge' ? ['flex', 'flex'] : ['auto']
                        }
                        gap="medium"
                      >
                        <MonthlyCharges />
                        <ExpiringSubscriptions />
                      </Grid>
                    </SkeletonContext.Provider>
                  </Box>
                </Box>
              </Box>
              <ContentPane alignSelf="start" pad="large" animation="fadeIn">
                <SkeletonContext.Provider
                  value={sidePanelLoading ? skeletonAnimation : undefined}
                >
                  <Box gap="large">
                    <QuickActions icons />
                    <Divider />
                    <Recommended inline />
                    <Divider />
                    <Learn inline />
                  </Box>
                </SkeletonContext.Provider>
              </ContentPane>
            </Grid>
          )}
        </ResponsiveContext.Consumer>
      </PageContent>
    </Page>
    </>
  );
}

export default Home;
