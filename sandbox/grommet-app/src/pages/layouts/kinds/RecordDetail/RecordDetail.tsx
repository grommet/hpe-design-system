import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Layer,
  Notification,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
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
  const breakpoint = useContext(ResponsiveContext);
  const columns =
    scheduledJobs || ['xsmall', 'small'].includes(breakpoint)
      ? ['flex', 'auto']
      : ['flex', 'medium'];
  const rows = ['auto'];
  const gap = {
    xsmall: 'xsmall',
    small: 'xsmall',
    medium: 'medium',
    large: 'xlarge',
    xlarge: 'xlarge',
  };

  const areasDefault = [
    ['notification', 'context-pane'],
    ['details', 'context-pane'],
    ['scheduled-actions', 'context-pane'],
    ['iLO-security', 'context-pane'],
    ['unassigned', 'context-pane'],
  ];

  const areasSmall = [
    ['notification', 'unassigned'],
    ['details', 'unassigned'],
    ['scheduled-actions', 'unassigned'],
    ['iLO-security', 'unassigned'],
    ['context-pane', 'unassigned'],
  ];

  const areas = ['xsmall', 'small'].includes(breakpoint)
    ? areasSmall
    : areasDefault;

  return (
    <Page pad={{ bottom: '3xlarge' }} flex="grow">
      <PageContent>
        <PageHeader
          title="Server group name"
          subtitle="2 servers"
          parent={
            <RoutedAnchor
              as={Link}
              to="/layouts"
              label="Layouts"
              icon={<Previous />}
            />
          }
        />
        <Grid areas={areas} columns={columns} rows={rows} gap={gap[breakpoint]}>
          <Box gridArea="notification">
            <Notification
              status="info"
              message="1 job is scheduled."
              actions={[
                {
                  label: 'View',
                  href: '#',
                  onClick: () => {
                    setScheduledJobs(true);
                  },
                },
              ]}
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
          <Box gridArea="context-pane" gap="medium">
            {scheduledJobs && (
              <Jobs
                layer={['xsmall', 'small', 'medium'].includes(breakpoint)}
                onClose={() => setScheduledJobs(false)}
                animation={
                  ['xsmall', 'small', 'medium'].includes(breakpoint)
                    ? false
                    : ['slideLeft', 'fadeIn']
                }
              />
            )}
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
};

const Jobs = ({ animation, layer, onClose, ...rest }) => {
  const content = (
    <ContentPane
      heading="Scheduled and pending jobs"
      level={2}
      actions={
        <Button
          autoFocus
          a11yTitle="You are in a new page region displaying scheduled and pending jobs. Remove this region by pressing Enter."
          icon={<Close />}
          onClick={onClose}
        />
      }
      skeleton={undefined}
      animation={animation}
      {...rest}
    >
      <ScheduledJobs level={2} />
    </ContentPane>
  );

  if (layer) {
    return (
      <Layer full modal={false} animation={animation}>
        {content}
      </Layer>
    );
  }

  return content;
};
