import React from 'react';
import { Link } from 'react-router-dom';
import {
  Anchor,
  Box,
  Grid,
  List,
  Menu,
  NameValueList,
  NameValuePair,
  Notification,
  Page,
  PageContent,
  PageHeader,
  Text,
} from 'grommet';
import { RoutedAnchor } from '../../../../components';
import { More, Previous } from 'grommet-icons';
import { sentenceCase } from '../../../../utils/format'
import { statusMap } from '../../../../utils/status';
import ContentPane from '../../../../components/ContentPane';

const groupDetails = {
  status: 'Okay',
  state: 'Job in progress',
  group: 'Group name',
  servers: 2,
  baseline: 'SPP 2022.09.04(04 Sep 2022)',
  power: 'On',
};

const iLOSecurity = {
  'critical': {
    servers: [],
    label: 'At risk',
  },
  'warning': {
    servers: [{ id: 'server1', name: 'Server 1', url: '#' }],
    label: 'Needs attention',
  },
  'ok': {
    servers: [{ id: 'server2', name: 'Server 2', url: '#' }],
    label: 'Okay',
  },
  'unknown': {
    servers: [],
    label: 'Unknown',
  },
  'unsupported': {
    servers: [],
    label: 'Unsupported',
  },
}

const nameProps = {
  width: ['xsmall', 'max-content']
};

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 37);

const scheduledActions = [
  { action: 'Update firmware', date: futureDate.toISOString() },
  { action: 'Update firmware', date: futureDate.toISOString() },
];

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
            <NameValueList nameProps={nameProps}>
              {Object.entries(groupDetails).map(([name, value]) => (
                <NameValuePair
                  key={name}
                  name={sentenceCase(name)}
                >
                  {sentenceCase(value)}
                </NameValuePair>
              ))}
            </NameValueList>
          </ContentPane>
          <ContentPane
            heading="Scheduled actions"
            level={2}
            contain={false}
            actions={undefined}
            skeleton={undefined}
          >
            <List
              data={scheduledActions}
              defaultItemProps={{ pad: undefined }}
            >
              {datum => (
                <Box
                  direction="row"
                  align='center'
                  alignSelf='start'
                  justify='between'
                  background="background-front"
                  gap="xlarge"
                  margin={{ bottom: 'small' }}
                  pad={{ vertical: 'small', horizontal: 'medium' }}
                  round="small"
                >
                  <Box direction='row' gap='large'>
                    <Text color="text-strong" weight={500}>{datum.action}</Text>
                    <Text>
                      {Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: "short" })
                        .format(new Date(datum.date))}
                    </Text>
                    <Anchor label="1 server" href="#" />
                  </Box>
                  <Menu
                    icon={<More />}
                    items={[
                      { label: 'Edit schedule', onClick: () => { } },
                      { label: 'Remove', onClick: () => { } },
                    ]}
                  />
                </Box>
              )}
            </List>
          </ContentPane>
          <ContentPane
            heading="iLO security"
            level={2}
            actions={undefined}
            skeleton={undefined}
          >
            <NameValueList nameProps={nameProps}>
              {Object.entries(iLOSecurity).map(([key, detail]) => (
                <NameValuePair
                  key={key}
                  name={sentenceCase(detail.label)}
                >
                  <Box direction="row" gap="small">
                    {React.cloneElement(statusMap.get(key)!.icon, { color: statusMap.get(key)!.color })}
                    {detail.servers.length} servers
                  </Box>
                </NameValuePair>
              ))}
            </NameValueList>
          </ContentPane>
        </Grid>
      </PageContent>
    </Page>
  );
}
