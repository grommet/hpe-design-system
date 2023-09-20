import React from 'react';
import {
  Anchor,
  Box,
  Button,
  Heading,
  NameValueList,
  NameValuePair,
  Page,
  PageContent,
  PageHeader,
  Tabs,
  Tab,
  ThemeContext,
  Paragraph,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ButtonGroup } from 'aries-core';
import { Meta } from '../components';
import { aries } from '../themes/aries';
import { FilterServers, ReverseAnchor } from '../examples';
import servers from '../data/mockData/servers.json';
// import { getPageDetails } from '../utils';

const title = 'ThemeTest';
// const page = getPageDetails(title);

const Container = ({ ...rest }) => (
  <Box
    gap="medium"
    pad={{ bottom: 'large' }}
    border={{ color: 'border-weak', side: 'bottom' }}
    {...rest}
  />
);

const MockPage = () => (
  <Page background="background-front" pad={{ bottom: 'xlarge' }}>
    <hpe-global-header kind="glcp" />
    <PageContent gap="medium">
      <PageHeader
        title="Devices"
        subtitle="Manage your devices."
        actions={
          <ButtonGroup>
            <Button label="Default action" />
            <Button secondary label="Secondary action" />
            <Button primary label="Primary action" />
          </ButtonGroup>
        }
      />
      <FilterServers />
    </PageContent>
  </Page>
);

const MockDetailPage = () => {
  const server = servers.servers.items[0];

  return (
    <Page background="background-front" pad={{ bottom: 'xlarge' }}>
      <hpe-global-header kind="glcp" />
      <PageContent gap="medium">
        <PageHeader
          parent={<ReverseAnchor label="Servers" />}
          title={server.displayName}
          subtitle="Manage details for this server."
          actions={
            <ButtonGroup>
              <Button secondary label="Edit details" />
            </ButtonGroup>
          }
        />
        <Box align="start" gap="medium" pad={{ bottom: 'medium' }}>
          <Box gap="xsmall">
            <Heading level={2} margin="none">
              Hardware
            </Heading>
            <Paragraph margin="none">
              Here is a paragraph if it were to be here with a{' '}
              <Anchor>link to something</Anchor>.
            </Paragraph>
          </Box>
          <NameValueList nameProps={{ width: ['auto', 'max-content'] }}>
            <NameValuePair name="Serial number">
              {server.hardware.serialNumber}
            </NameValuePair>
            <NameValuePair name="Product ID">
              {server.hardware.productId}
            </NameValuePair>
            <NameValuePair name="Power state">
              {server.hardware.powerState}
            </NameValuePair>
            <NameValuePair name="Indicator LED">
              {server.hardware.indicatorLed}
            </NameValuePair>
          </NameValueList>
        </Box>
        <Box gap="medium">
          <Heading level={2} margin="none">
            Host
          </Heading>
          <NameValueList nameProps={{ width: ['auto', 'max-content'] }}>
            <NameValuePair name="Host name">
              {server.host.hostname}
            </NameValuePair>
            <NameValuePair name="OS name">{server.host.osName}</NameValuePair>
            <NameValuePair name="OS version">
              {server.host.osVersion}
            </NameValuePair>
          </NameValueList>
        </Box>
      </PageContent>
    </Page>
  );
};

const ButtonChanges = () => (
  <Box direction="row" align="start" gap="small">
    <Button label="Default button" />
    <Button label="Toolbar button" kind="toolbar" />
    <Button label="Secondary button" secondary />
    <Button label="Primary button" primary />
  </Box>
);

const TabsChanges = () => (
  <Tabs justify="start">
    <Tab title="General" />
    <Tab title="Account" />
    <Tab title="Billing" />
  </Tabs>
);

const currentTheme = {
  ...hpe,
  button: {
    toolbar: {
      border: {
        width: undefined,
      },
    },
  },
};

const ThemeTest = () => (
  <>
    <Meta
      title={title}
      canonicalUrl="https://design-system.hpe.design/theme-test"
    />
    <Box gap="medium">
      <ThemeContext.Extend value={currentTheme}>
        <MockPage />
      </ThemeContext.Extend>
      <ThemeContext.Extend value={aries}>
        <MockPage />
      </ThemeContext.Extend>
      <ThemeContext.Extend value={currentTheme}>
        <MockDetailPage />
      </ThemeContext.Extend>
      <ThemeContext.Extend value={aries}>
        <MockDetailPage />
      </ThemeContext.Extend>
      <ThemeContext.Extend value={currentTheme}>
        <Page background="background-front" pad={{ vertical: 'large' }}>
          <PageContent gap="large">
            <Heading margin="none">Before and after</Heading>
            <Container>
              <ButtonChanges />
              <ThemeContext.Extend value={aries}>
                <ButtonChanges />
              </ThemeContext.Extend>
            </Container>

            <Container>
              <Heading margin="none">Heading 1</Heading>
              <ThemeContext.Extend value={aries}>
                <Heading margin="none">Heading 1</Heading>
              </ThemeContext.Extend>
            </Container>
            <Container>
              <TabsChanges />
              <ThemeContext.Extend value={aries}>
                <TabsChanges />
              </ThemeContext.Extend>
            </Container>
            <Container>
              <Box direction="row" gap="medium">
                {['large', 'xlarge'].map(size => (
                  <Paragraph size={size} key={size} margin="none">
                    Here is a sample paragraph of text. It has a max-width
                    depending on the size.
                  </Paragraph>
                ))}
              </Box>
              <ThemeContext.Extend value={aries}>
                <Box direction="row" gap="medium">
                  {['large', 'xlarge'].map(size => (
                    <Paragraph size={size} key={size} margin="none">
                      Here is a sample paragraph of text. It has a max-width
                      depending on the size.
                    </Paragraph>
                  ))}
                </Box>
              </ThemeContext.Extend>
            </Container>
          </PageContent>
        </Page>
      </ThemeContext.Extend>
    </Box>
  </>
);

export default ThemeTest;
