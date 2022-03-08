import React, { useContext } from 'react';
import { Box, Header, Heading, Notification } from 'grommet';
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
      <ContentArea title="Global Header" gap="none" />
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
