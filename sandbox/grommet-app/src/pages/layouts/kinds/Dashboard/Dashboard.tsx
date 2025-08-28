import React, { useContext } from 'react';
import {
  Page,
  Button,
  PageContent,
  Grid,
  Box,
  PageHeader,
  ResponsiveContext,
} from 'grommet';
import { Link } from 'react-router-dom';
import { Configure, GenAIFill, NewWindow } from 'grommet-icons';
import { Capacity } from './components';
import { SustainabilityOverview } from '../../../SustainabilityOverview';
import { Usage } from './Usage';
import { Monitoring } from './Monitoring';
import { GreenLakeStatus } from './GreenLakeStatus';
import { Costs } from './Costs';
import { Tasks } from './Tasks';
import { Notifications } from '../../../Notifications';
import { RecentServices } from '../../../RecentServices';
import { Networking } from './Networking';
import { Storage } from './Storage';
import { SupportingContext } from '../../../../contexts';
import { Chat } from '../../../../components/Chat';

export const Dashboard = () => {
  const { setShowSupporting } = useContext(SupportingContext);
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Page kind="full" pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <PageHeader
          title="Hub"
          actions={
            <Box direction="row">
              <Button icon={<Configure />} size="large" />
              <Button icon={<NewWindow />} size="large" />
              <Button
                icon={<GenAIFill />}
                size="large"
                onClick={() => setShowSupporting(<Chat />)}
              />
            </Box>
          }
        />
        <Box gap="medium" responsive="container">
          <Grid
            columns={
              ['xsmall', 'small'].includes(breakpoint)
                ? ['auto']
                : ['flex', 'flex']
            }
            gap="medium"
          >
            <Box responsive="container">
              <ResponsiveContext.Consumer>
                {size => (
                  <Grid
                    columns={size === 'xsmall' ? ['auto'] : ['flex', 'flex']}
                    gap="medium"
                  >
                    <RecentServices compact={true} />
                    <Grid gap="xsmall">
                      <Networking />
                      <Storage />
                      <Box align="center">
                        <Link to="/layouts/results">
                          <Button label="View more insights" secondary />
                        </Link>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </ResponsiveContext.Consumer>
            </Box>
            <Box responsive="container">
              <ResponsiveContext.Consumer>
                {size => (
                  <Grid
                    columns={size === 'xsmall' ? ['auto'] : ['flex', 'flex']}
                    gap="medium"
                  >
                    <Grid gap="xsmall">
                      <Capacity />
                      <Usage />
                    </Grid>
                    <SustainabilityOverview />
                  </Grid>
                )}
              </ResponsiveContext.Consumer>
            </Box>
          </Grid>
          <Grid columns="medium" gap="medium">
            <Monitoring />
            <GreenLakeStatus />
            <Costs />
            <Tasks />
          </Grid>
          <Grid
            columns={
              ['xsmall', 'small', 'medium'].includes(breakpoint)
                ? ['auto']
                : ['flex', 'flex']
            }
            gap="medium"
          >
            <Notifications />
            <Box background="background-front" round="medium" pad="medium">
              Locations
            </Box>
          </Grid>
        </Box>
      </PageContent>
    </Page>
  );
};
