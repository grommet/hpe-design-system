import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Notification,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';
import { RoutedAnchor } from '../../../../components';
import { Previous } from 'grommet-icons';
import ContentPane from '../../../../components/ContentPane';
import { DetailSummary } from './DetailSummary';
import { ScheduledActions } from './ScheduledActions';
import { ILOSecurity } from './ILOSecurity';

export const RecordDetail: React.FC = () => {
  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <PageHeader
          title="Group name"
          subtitle="2 servers"
          parent={<RoutedAnchor as={Link} to="/layouts" label="Layouts" icon={<Previous />} />}
        />
        <Grid gap="large">
          <Notification
            status="info"
            message="1 job is scheduled."
            actions={[{ label: 'View', href: '#' }]}
          />
          <ContentPane
            heading="Details"
            level={2}
            actions={undefined}
            skeleton={undefined}
          >
            <DetailSummary />
          </ContentPane>
          <ContentPane
            heading="Scheduled actions"
            level={2}
            contain={false}
            actions={undefined}
            skeleton={undefined}
          >
            <ScheduledActions />
          </ContentPane>
          <ContentPane
            heading="iLO security"
            level={2}
            actions={undefined}
            skeleton={undefined}
          >
            <ILOSecurity />
          </ContentPane>
        </Grid>
      </PageContent>
    </Page>
  );
}
