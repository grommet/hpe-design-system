import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Page, PageContent } from 'grommet';
import { Previous } from 'grommet-icons';
import { RoutedAnchor } from '../../../../components';
import { HPEAI } from './HPEAI';
import { MarketingBrochure } from './MarketingBrochure';
import { HPEVideo } from './HPEVideo';
import { HPEPrivateCloud } from './HPEPrivateCloud';
import { HPEProducts } from './HPEProducts';

export const HPEMarketing = () => {
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
    </Page>
  );
};
