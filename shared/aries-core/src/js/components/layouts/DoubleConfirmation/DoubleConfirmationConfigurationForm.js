/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import {
  Box,
  Button,
  Data,
  DataTable,
  Heading,
  Layer,
  Page,
  PageContent,
  AnnounceContext,
  Toolbar,
  DataSearch,
  DataFilters,
  DataSummary,
} from 'grommet';
import {
  ConfirmationContext,
  ConfirmationProvider,
  useConfirmation,
} from '@shared/hooks';
import applications from '../../../../mockData/applications.json';
import { LayerForm, LayerHeader } from '../Layer';
import { DoubleConfirmation } from './DoubleConfirmation';

export const DoubleConfirmationConfigurationForm = () => (
  <ConfirmationProvider>
    <ConfirmationContext.Consumer>
      {({ showLayer, showConfirmation }) => (
        <>
          <ApplicationsPage />
          {showLayer ? <AddApplication /> : null}
          {showConfirmation ? <DoubleConfirmation title="application" /> : null}
        </>
      )}
    </ConfirmationContext.Consumer>
  </ConfirmationProvider>
);

const AddApplication = ({ ...rest }) => {
  const { onClose } = useConfirmation();
  const announce = useContext(AnnounceContext);

  useEffect(() => {
    announce('Add application modal opened', 'assertive');
  }, [announce]);

  return (
    <DoubleConfirmationSidedrawer onEsc={onClose} {...rest}>
      <LayerHeader title="Add application" onClose={onClose} />
      <Box flex={false}>
        <LayerForm id="application-form" />
      </Box>
      <Box direction="row" gap="xsmall" flex={false}>
        <Button
          form="application-form"
          label="Add application"
          primary
          type="submit"
        />
        <Button label="Cancel" onClick={onClose} />
      </Box>
    </DoubleConfirmationSidedrawer>
  );
};

const columns = [
  {
    property: 'title',
    header: 'Title',
  },
  {
    property: 'publisher',
    header: 'Publisher',
  },
  {
    property: 'pricing',
    header: 'Pricing',
  },
];

const ApplicationsPage = () => {
  const { setShowLayer } = useConfirmation();
  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <Box
          background="background-front"
          pad="medium"
          round="xlarge"
          gap="medium"
        >
          <Heading id="applications-heading" level={2} margin="none">
            Applications
          </Heading>
          <Data data={applications}>
            <Toolbar>
              <DataSearch />
              <DataFilters layer />
              <Box flex />
              <Button
                label="Add application"
                secondary
                onClick={() => setShowLayer(true)}
              />
            </Toolbar>
            <DataSummary />
            <Box height={{ max: 'medium' }} alignSelf="start" overflow="auto">
              <DataTable
                aria-describedby="applications-heading"
                columns={columns}
                pin
                primaryKey="title"
                sortable
              />
            </Box>
          </Data>
        </Box>
      </PageContent>
    </Page>
  );
};

export const DoubleConfirmationSidedrawer = ({ children, ...rest }) => (
  <Layer position="right" full="vertical" {...rest}>
    <Box pad="medium" gap="medium" overflow="auto">
      {children}
    </Box>
  </Layer>
);
