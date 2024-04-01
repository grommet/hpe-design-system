import { useContext } from 'react';
import { Box, Grid, Page, PageContent, ResponsiveContext } from 'grommet';

import { GetStarted } from './GetStarted';
import { RecentServices } from './RecentServices';
import { Learn } from './next/Learn';
import { QuickActions } from './next/QuickActions';
import { FeaturedServices } from './FeaturedServices';
import ContentPane from '../components/ContentPane';

function Home() {
  const size = useContext(ResponsiveContext);
  return (
    <Page pad={{ vertical: 'large' }}>
      <PageContent gap="medium">
        <Grid
          columns={
            ['small', 'xsmall'].includes(size) ? ['auto'] : ['flex', 'medium']
          }
          gap={size === 'medium' ? 'large' : 'xlarge'}
        >
          <Box gap="large">
            <GetStarted heading />
            <RecentServices />
            <FeaturedServices />
          </Box>
          <Box gap="medium">
            <ContentPane>
              <QuickActions edit={false} />
            </ContentPane>
            <Learn />
          </Box>
        </Grid>
      </PageContent>
    </Page>
  );
}

export default Home;
