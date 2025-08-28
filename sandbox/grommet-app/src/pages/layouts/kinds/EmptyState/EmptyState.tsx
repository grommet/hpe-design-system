import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  Page,
  PageContent,
  PageHeader,
  Toolbar,
} from 'grommet';
import { DriveCage, Previous } from 'grommet-icons';
import ContentPane from '../../../../components/ContentPane';
import { EmptyState, RoutedAnchor } from '../../../../components';
import { DataTableActions } from './DataTableActions';
import { tableColumns } from './tableColumns';
import bareMetal from '../../../../mockData/bareMetal.json';

const EmptyStatePage = ({ ...rest }) => {
  const data = bareMetal['Las Vegas'];

  return (
    <Page pad={{ bottom: '3xlarge' }} {...rest}>
      <PageContent>
        <PageHeader
          title="Bare Metal"
          parent={
            <RoutedAnchor
              as={Link}
              label="Layouts"
              to="/layouts"
              icon={<Previous />}
            />
          }
        />
        <ContentPane
          heading="Las Vegas"
          level={2}
          actions={undefined}
          skeleton={undefined}
        >
          <Data data={data}>
            <Toolbar>
              <Toolbar>
                <DataSearch />
                <DataFilters layer />
              </Toolbar>
              <DataTableActions servers={data} flex justify="end" />
            </Toolbar>
            <DataSummary />
            <DataTable
              columns={tableColumns}
              onSelect={() => {}}
              placeholder={
                data.length === 0 && (
                  <Box pad="3xlarge">
                    <EmptyState
                      title="No Bare Metal instances"
                      level={3}
                      actions={<Button label="Add an instance" primary />}
                      icon={<DriveCage size="xxlarge" />}
                    />
                  </Box>
                )
              }
            />
          </Data>
        </ContentPane>
      </PageContent>
    </Page>
  );
};

export { EmptyStatePage as EmptyState };
