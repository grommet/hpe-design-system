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
import { CustomizableCards, CustomizeHeader, SkeletonContext } from '../components';
import { skeleton as skeletonAnimation, useLoading } from '../utils/skeleton';
import { useState } from 'react';
import styled, { css } from 'styled-components';

// A Box that can be dimmed and blurred when the customize mode is active
// The box also disables pointer events to prevent interaction with the content while customizing
const DimmableBox = styled(Box)`
  transition: opacity 0.3s ease, filter 0.3s ease;
  ${({ dimmed }) => dimmed && css`
    opacity: 0.3;
    filter: blur(4px);
    pointer-events: none;
  `}
`;

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
    { id: 'userOverview', component: <UserOverview /> },
    { id: 'notifications', component: <Notifications />, size: { columns: 2, rows: 1 } },
    { id: 'monthlyCharges', component: <MonthlyCharges /> },
    { id: 'expiringSubscriptions', component: <ExpiringSubscriptions /> },
    { id: 'recentServices', component: <RecentServices compact /> },

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
                  <DimmableBox
                    skeleton={getStartedLoading ? skeletonAnimation : undefined}
                    dimmed={customizeOpen}
                  >
                    <SkeletonContext.Provider
                      value={getStartedLoading ? skeletonAnimation : undefined}
                    >
                      <GetStarted kind="next" />
                    </SkeletonContext.Provider>
                  </DimmableBox>
                  <Box
                    skeleton={insightsLoading ? skeletonAnimation : undefined}
                  >
                    <SkeletonContext.Provider
                      value={insightsLoading ? skeletonAnimation : undefined}
                    >
                      <CustomizableCards
                        columns={
                          size === 'xlarge'
                            ? ['flex', 'flex', 'flex']
                            : ['auto']
                        }
                        data={widgets}
                        onOrder={customizeOpen ? setWidgets : undefined}
                        onResize={(id, size) => {
                          const nextWidgets = widgets.map(widget => (
                            widget.id === id ? { ...widget, size } : widget
                          ));
                          setWidgets(nextWidgets);
                        }}
                      />
                    </SkeletonContext.Provider>
                  </Box>
                </Box>
              </Box>
              <DimmableBox
                as={ContentPane}
                alignSelf="start"
                pad="large"
                animation="fadeIn"
                dimmed={customizeOpen}
              >
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
              </DimmableBox>
            </Grid>
          )}
        </ResponsiveContext.Consumer>
      </PageContent>
    </Page>
    </>
  );
}

export default Home;
