import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
} from 'grommet';
import { Previous } from 'grommet-icons';
import { RoutedAnchor } from '../../../../components';
import { DetailPane } from './DetailPane';
import { PerformanceSummary } from './PerformanceSummary';
import { PhysicalCapacity } from './PhysicalCapacity';
import { SystemSummary } from './SystemSummary';
import { PropertiesGeneral } from './PropertiesGeneral';
import { PropertiesRelated } from './PropertiesRelated';

export const DSCCSystemDetail = () => {
  const breakpoint = useContext(ResponsiveContext);

  const summaryColumns = ['flex', 'flex', 'auto'];

  const summaryRows = [['xsmall', 'auto']];

  const summaryAreas = ['xsmall', 'small'].includes(breakpoint)
    ? [
        ['summary-1', 'summary-2'],
        ['summary-3', 'summary-3'],
      ]
    : [['summary-1', 'summary-2', 'summary-3']];

  const detailColumns = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? ['flex', 'flex']
    : ['flex', 'medium'];
  const detailRows = ['auto'];
  const detailAreas = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? [
        ['detail-1', 'detail-1'],
        ['detail-2', 'detail-3'],
      ]
    : [
        ['detail-1', 'detail-2'],
        ['detail-1', 'detail-3'],
      ];

  const metricSize = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? 'small'
    : 'medium';

  return (
    <Page pad={{ bottom: '3xlarge' }} flex={false}>
      <PageContent>
        <PageHeader
          title="System detail page"
          parent={
            <RoutedAnchor
              as={Link}
              to="/layouts"
              label="Layouts"
              icon={<Previous />}
            />
          }
        />
        <Box gap="xlarge">
          <Grid
            areas={summaryAreas}
            columns={summaryColumns}
            rows={summaryRows}
            gap={['large', 'xlarge'].includes(breakpoint) ? 'medium' : 'small'}
          >
            <SystemSummary gridArea="summary-1" size={metricSize} />
            <PhysicalCapacity gridArea="summary-2" size={metricSize} />
            <PerformanceSummary gridArea="summary-3" size={metricSize} />
          </Grid>
          <Grid
            areas={detailAreas}
            columns={detailColumns}
            rows={detailRows}
            gap={['large', 'xlarge'].includes(breakpoint) ? 'large' : 'medium'}
          >
            <DetailPane gridArea="detail-1" />
            <PropertiesGeneral gridArea="detail-2" />
            <PropertiesRelated gridArea="detail-3" />
          </Grid>
        </Box>
      </PageContent>
    </Page>
  );
};
