import React, { useContext } from 'react';
import { Page, Button, PageContent, Grid, Box, PageHeader } from 'grommet';
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

export const Dashboard = () => {
  const { setShowSupporting } = useContext(SupportingContext);
  return (
    <Page kind="full" pad={{ bottom: 'large' }}>
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
                onClick={() => setShowSupporting(true)}
              />
            </Box>
          }
        />

        <Box gap="medium">
          <Grid columns={['flex', 'flex']} gap="medium">
            <Grid columns={['flex', 'flex']} gap="medium">
              <RecentServices compact={true} />
              <Grid gap="small">
                <Networking />
                <Storage />
                <Box align="center">
                  <Button label="View more insights" secondary />
                </Box>
              </Grid>
            </Grid>
            <Grid columns={['flex', 'flex']} gap="medium">
              <Grid gap="small">
                <Capacity />
                <Usage />
              </Grid>
              <SustainabilityOverview />
            </Grid>
          </Grid>
          <Grid columns="medium" gap="medium">
            <Monitoring />
            <GreenLakeStatus />
            <Costs />
            <Tasks />
          </Grid>
          <Grid columns={['flex', 'flex']} gap="medium">
            <Notifications />
            <Box background="background-front" round="small" pad="medium">
              Locations
            </Box>
          </Grid>
        </Box>
      </PageContent>
    </Page>
  );
};
