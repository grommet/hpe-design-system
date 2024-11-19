import React, { useState } from 'react';
import {
  Anchor,
  Box,
  Grid,
  Main,
  Notification,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  Tab,
  Tabs,
} from 'grommet';
import { TextEmphasis } from 'aries-core';
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
        <Main>
          <Box gap="medium">
            <Notification
              flex={false}
              status="critical"
              message={`Support for CentOS v7.5 ended on 04/04/021.
            One or more applications require updates to a later version.`}
              // onClick is used for Design System site demonstration only.
              // in production, onClick should be replaced with an href that
              // changes the route and sets the active tab.
              actions={[{ label: 'View details', onClick: () => setActive(2) }]}
            />
            <Tabs justify="start" activeIndex={active}>
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
                      <Card
                        title={`Application${index}`}
                        key={index}
                        level={2}
                      />
                    ))}
                  </Grid>
                </Box>
              </Tab>
              <Tab title="Sites" onClick={() => setActive(2)}>
                <Box pad={{ vertical: 'medium' }} gap="medium">
                  <Notification
                    status="critical"
                    message={
                      <Paragraph margin="none">
                        <TextEmphasis>DemoSite2</TextEmphasis>,{' '}
                        <TextEmphasis>BLR2-setup1</TextEmphasis>, and{' '}
                        {/* eslint-disable-next-line max-len */}
                        <TextEmphasis>DemoSite4</TextEmphasis> require updates
                        to{' '}
                        <Anchor
                          href="#"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          CentOS v8.1
                        </Anchor>
                        . <Anchor href="#">Apply updates</Anchor> to CentOS.
                      </Paragraph>
                    }
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
        </Main>
      </PageContent>
    </Page>
  );
};
