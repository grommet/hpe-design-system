import React, { useEffect, useState } from 'react';
import { Box } from 'grommet';
import { ActivitiesNavigationalCards } from '../card';

const skeleton = { message: { start: 'Loading', end: 'Content Loaded' } };

export const DashBoardSkeletonExample = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(!loading), 3000);
  }, [loading]);

  return (
    <>
      <Box width="large" skeleton={loading ? skeleton : undefined}>
        <ActivitiesNavigationalCards skeleton={loading} />
      </Box>
    </>
  );
};
