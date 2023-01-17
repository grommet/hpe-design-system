import React, { useEffect, useState } from 'react';
import { Box, Page, PageContent } from 'grommet';
import { ActivitiesNavigationalCards } from '../card';

const skeleton = { message: { start: 'Loading', end: 'Content Loaded' } };

export const DashBoardSkeletonExample = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(!loading), 3000);
  }, [loading]);

  return (
    <Page skeleton={loading ? skeleton : undefined}>
      <PageContent>
        <ActivitiesNavigationalCards skeleton={loading} />
      </PageContent>
    </Page>
  );
};
