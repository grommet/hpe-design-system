import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Page,
  PageContent,
  ResponsiveContext,
  PageHeader,
  Text,
} from 'grommet';
import { Previous } from 'grommet-icons';
import { RoutedAnchor } from '../../../../components';
import { HPEAI } from './HPEAI';

export const HPEMarketing = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <PageHeader
          parent={
            <RoutedAnchor
              as={Link}
              label="Layouts"
              to="/layouts"
              icon={<Previous />}
            />
          }
        />
      </PageContent>
      <HPEAI />
    </Page>
  );
};
