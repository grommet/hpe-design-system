import React, { useState } from 'react';
import {
  Box,
  Grid,
  Notification,
  Page,
  PageContent,
  PageHeader,
  Tab,
  Tabs,
} from 'grommet';
import { ReverseAnchor } from '../ReverseAnchor';
import { Card } from '../Card';

const sites = [
  'BLR2-setup',
  'DemoSite2',
  'DemoSite3',
  'BLR2-setup1',
  'DemoSite4',
];

export const PageBannerExample = () => {
  const [active, setActive] = useState(0);
  return (
    <Page>
      <PageContent>
        <PageHeader
          title="Machine Learning Ops"
          parent={<ReverseAnchor label="Private Cloud Home" />}
        />
        <Box gap="medium">
          <Notification
            flex={false}
            status="critical"
            message={`Support for CentOS v7.5 ended on 04/04/021. One or 
          more applications require updates to a later version.`}
            actions={[{ label: 'View details', onClick: () => setActive(2) }]}
          />
          <Tabs activeIndex={active}>
            <Tab title="Projects" onClick={() => setActive(0)}>
              <Box pad={{ vertical: 'medium' }}>
                <Grid columns="medium" rows="small" gap="medium">
                  {[0, 1, 2, 3, 4].map(index => (
                    <Card title={`Project${index}`} key={index} level={2} />
                  ))}
                </Grid>
              </Box>
            </Tab>
            <Tab title="Applications" onClick={() => setActive(1)}>
              <Box pad={{ vertical: 'medium' }}>
                <Grid columns="medium" rows="small" gap="medium">
                  {[0, 1, 2, 3, 4].map(index => (
                    <Card title={`Application${index}`} key={index} level={2} />
                  ))}
                </Grid>
              </Box>
            </Tab>
            <Tab title="Sites" onClick={() => setActive(2)}>
              <Box pad={{ vertical: 'medium' }} gap="medium">
                <Notification
                  status="critical"
                  message={`DemoSite2, BLR2-setup1, and DemoSite4 require 
                  updates to CentOS v8.1. Initiate an update for a site 
                  from the action menu in a site detail page in the ML 
                  Ops service. Prior to updating, review the prerequisites 
                  for deployed resources.`}
                />
                <Grid columns="medium" gap="medium">
                  {sites.map((site, index) => (
                    <Card title={site} key={index} level={2} />
                  ))}
                </Grid>
              </Box>
            </Tab>
          </Tabs>
        </Box>
      </PageContent>
    </Page>
  );
};
