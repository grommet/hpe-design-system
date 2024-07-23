import React from 'react';
import PropTypes from 'prop-types';
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
  ThemeContext,
  Paragraph,
} from 'grommet';
import { current as hpeCurrent } from '../themes/testTheme';
import { ButtonGroup } from 'aries-core';
import { Meta } from '../components';
import { current } from '../themes/testTheme';
import { FilterServers, ReverseAnchor } from '../examples';
import servers from '../data/mockData/servers.json';

const title = 'ThemeTest';

const Banner = ({ updated }) => (
  <Box
    background="background-front"
    fill="horizontal"
    pad="medium"
    border={{ side: 'bottom' }}
  >
    <Heading level={2} margin="none">
      {`v5.${updated ? 1 : 0}.0`}
    </Heading>
  </Box>
);

Banner.propTypes = {
  updated: PropTypes.bool,
};

const MockPage = () => (
  <Page background="background-front" pad={{ bottom: 'xlarge' }}>
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

const ThemeTest = () => (
  <ThemeContext.Extend value={current}>
    <Meta
      title={title}
      canonicalUrl="https://design-system.hpe.design/theme-test"
    />
    <Box gap="medium">
      <ThemeContext.Extend value={hpeCurrent}>
        <Banner />
        <MockPage />
      </ThemeContext.Extend>
      <Box>
        <Banner updated />
        <MockPage />
      </Box>
      <ThemeContext.Extend value={hpeCurrent}>
        <Banner />
        <MockDetailPage />
      </ThemeContext.Extend>
      <Box>
        <Banner updated />
        <MockDetailPage />
      </Box>
    </Box>
  </ThemeContext.Extend>
);

export default ThemeTest;