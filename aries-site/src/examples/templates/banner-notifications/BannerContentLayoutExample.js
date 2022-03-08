import React, { useContext } from 'react';
import {
  Avatar,
  Box,
  Button,
  Header,
  Heading,
  Notification,
  Text,
} from 'grommet';
import { HelpOption, HomeRounded } from 'grommet-icons';
import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from '../page-layouts/components';
import { ContentArea } from '../page-layouts/anatomy/components';
import { PageContent } from '../content-layouts/ResponsiveContentLayoutExample';

export const BannerContentLayoutExample = () => (
  <AppContainer>
    <Box>
      <ContentArea
        pad={{ horizontal: 'large', vertical: 'small' }}
        direction="row"
        title="HPE Service Name"
        gap="none"
        justify="between"
      >
        <Box align="center" direction="row" gap="small">
          <>
            <Button icon={<HelpOption />} a11yTitle="Help" title="Help" />
            <Button icon={<HomeRounded />} a11yTitle="Home" title="Home" />
          </>
          <Avatar background="purple!" flex={false}>
            <Text size="large" color="text-strong">
              JS
            </Text>
          </Avatar>
        </Box>
      </ContentArea>
      <Notification
        status="warning"
        message={`Your supscription will expire in 7 days. Renew your 
            subscription to ensure you don't lose access.`}
        onClose={() => {}}
        actions={[
          {
            href: '#',
            label: 'Renew Subscription',
          },
        ]}
        global
      />
    </Box>
    <PageContainer>
      <PageHeader />
      <PageContent />
    </PageContainer>
    <ContentArea title="Global Footer" />
  </AppContainer>
);

const PageHeader = () => {
  const { ...pageContainer } = useContext(PageContainerContext);
  return (
    <Header {...pageContainer}>
      <Heading level={1} margin="none" size="small">
        {/* for dev purposes, will be replaced with dashboard content */}
        Page Header
      </Heading>
    </Header>
  );
};
