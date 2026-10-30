// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Page, PageContent, PageHeader } from 'grommet';
import { Configure } from '@hpe-design/icons-grommet';
import { useShell } from '../contexts/ShellContext';
import { PAGE_KIND } from '../theme';
import { SurfaceTag } from '../components/common';
import { DiscoverServices } from './home/DiscoverServices';
import { HealthOverview } from './home/HealthOverview';
import { WeekAtAGlance } from './home/WeekAtAGlance';

// HPE GreenLake home: the platform's landing page. No local nav — the
// platform's own pages are reached through capabilities in the rail.
// Spacing follows the overview dashboard template: PageHeader pads medium
// below; with PageContent's medium gap that gives 48px before the first
// section, and sections are separated by an xlarge gap.
export const HomePage = () => {
  const { dispatch } = useShell();
  return (
    <Page kind={PAGE_KIND} pad={{ bottom: '3xlarge' }} flex={false}>
      <PageContent gap="medium">
        <PageHeader
          title="Home"
          subtitle={<SurfaceTag role="sheet" showVariant />}
          pad={{ top: 'medium', bottom: 'medium' }}
          actions={
            <Button
              label="Customize"
              icon={<Configure aria-hidden="true" />}
              secondary
              onClick={() =>
                dispatch({
                  type: 'SHOW_TOAST',
                  title: 'Customize',
                  message:
                    'This would let you add, remove and arrange widgets.',
                })
              }
            />
          }
        />
        <Box gap="xlarge" flex={false}>
          <HealthOverview />
          <WeekAtAGlance />
          <DiscoverServices />
        </Box>
      </PageContent>
    </Page>
  );
};
