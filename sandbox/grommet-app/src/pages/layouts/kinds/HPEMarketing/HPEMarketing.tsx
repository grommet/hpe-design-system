import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Page, PageContent, ResponsiveContext } from 'grommet';
import { Previous } from 'grommet-icons';
import { RoutedAnchor } from '../../../../components';
import { HPEAI } from './HPEAI';
import { MarketingBrochure } from './MarketingBrochure';
import { HPEVideo } from './HPEVideo';
import { HPEPrivateCloud } from './HPEPrivateCloud';
import { HPEProducts } from './HPEProducts';
import { HPEAIUseCase } from './HPEAIUseCase';
import { HPEArchitect } from './HPEArchitect';
import { HPECustomerStories } from './CustomerStories';

export const HPEMarketing = () => {
  const breakpoint = useContext(ResponsiveContext);
  const metricSize = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? 'small'
    : 'medium';
  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <Box pad="xsmall">
          <RoutedAnchor
            as={Link}
            label="Layouts"
            to="/layouts"
            icon={<Previous />}
          />
        </Box>
      </PageContent>
      <HPEAI />
      <MarketingBrochure />
      <HPEVideo />
      <HPEPrivateCloud />
      <HPEProducts />
      <HPEArchitect size={metricSize} />
      <HPECustomerStories />
    </Page>
  );
};
