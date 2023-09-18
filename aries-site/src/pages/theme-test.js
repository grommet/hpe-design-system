import React from 'react';
import {
  Box,
  Button,
  Heading,
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
import { FilterServers } from '../examples';
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
  <Page background="background-front">
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
      {/* <Box gap="xsmall">
        <Heading level={2} margin="none">
          Manage devices
        </Heading>
        <Paragraph margin="none">Here is some supplemental info.</Paragraph>
      </Box> */}
      <FilterServers />
    </PageContent>
  </Page>
);

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

const ThemeTest = () => (
  <>
    <Meta
      title={title}
      canonicalUrl="https://design-system.hpe.design/theme-test"
    />
    <Box gap="medium">
      <ThemeContext.Extend value={hpe}>
        <MockPage />
      </ThemeContext.Extend>
      <ThemeContext.Extend value={aries}>
        <MockPage />
      </ThemeContext.Extend>
      <ThemeContext.Extend value={hpe}>
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
