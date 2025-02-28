import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Page, PageContent, ResponsiveContext } from 'grommet';
import { Previous } from 'grommet-icons';
import { RoutedAnchor } from '../../../../components';
import { HPEAI } from './HPEAI';

export const HPEMarketing = () => {
  const size = useContext(ResponsiveContext);

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
    </Page>
  );
};
