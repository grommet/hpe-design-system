import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Notification,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';
import { RoutedAnchor } from '../../../../components';
import { Close, Previous } from 'grommet-icons';
import ContentPane from '../../../../components/ContentPane';
import { DetailSummary } from './DetailSummary';
import { ScheduledActions } from './ScheduledActions';
import { ILOSecurity } from './ILOSecurity';
import { RecentActivity } from './RecentActivity';
import { ScheduledJobs } from './ScheduledJobs';

export const RecordDetail: React.FC = () => {
  const [scheduledJobs, setScheduledJobs] = React.useState<boolean>(false);
  const columns = scheduledJobs ? ['flex', 'auto'] : ['flex', 'medium'];
  const rows = ['auto'];

  const areas = [
    ['notification', 'context-pane'],
    ['details', 'context-pane'],
    ['scheduled-actions', 'context-pane'],
    ['iLO-security', 'context-pane'],
    ['unassigned', 'context-pane'],
  ];

  return (
    <Page pad={{ bottom: 'xlarge' }} flex="grow">
      <PageContent>
        <PageHeader
          title="Group name"
          subtitle="2 servers"
          parent={<RoutedAnchor as={Link} to="/layouts" label="Layouts" icon={<Previous />} />}
        />
        <Grid areas={areas} columns={columns} rows={rows} gap="large">
          <Box gridArea="notification">
            <Notification
              status="info"
              message="1 job is scheduled."
              actions={[{ label: 'View', onClick: () => { setScheduledJobs(true) } }]}
            />
          </Box>
          <ContentPane
            gridArea="details"
            heading="Details"
            level={2}
            actions={undefined}
            skeleton={undefined}
          >
            <DetailSummary />
          </ContentPane>
          <ContentPane
            gridArea="scheduled-actions"
            heading="Scheduled actions"
            level={2}
            contain={true}
            actions={undefined}
            skeleton={undefined}
          >
            <ScheduledActions />
          </ContentPane>
          <ContentPane
            gridArea="iLO-security"
            heading="iLO security"
            level={2}
            actions={undefined}
            skeleton={undefined}
          >
            <ILOSecurity />
          </ContentPane>
          <Box gridArea='context-pane' gap="medium">
            {scheduledJobs && <ContentPane
              heading="Scheduled and pending jobs"
              level={2}
              actions={<Button a11yTitle="" icon={<Close />} onClick={() => setScheduledJobs(false)} />}
              skeleton={undefined}
              animation={["slideLeft", "fadeIn"]}
            >
              <ScheduledJobs level={2} />
            </ContentPane>}
            <ContentPane
              heading="Recent activity"
              level={2}
              actions={undefined}
              skeleton={undefined}
            >
              <RecentActivity />
            </ContentPane>
          </Box>
        </Grid>
      </PageContent>
    </Page>
  );
}
