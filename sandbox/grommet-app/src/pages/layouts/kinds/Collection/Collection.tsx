import React, { useContext, useEffect, useMemo } from 'react';
import {
  Grid,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
  Tab,
  Tabs,
} from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { DataView } from './DataView';
import { CollectionMenu } from './CollectionMenu';
import { PageActions } from './PageActions';
import { privateCloudColumns, publicCloudColumns } from './tableColumns';
import virtualMachines from '../../../../mockData/virtualMachines.json';
import { RoutedAnchor } from '../../../../components';
import { Previous } from 'grommet-icons';
import { Link } from 'react-router-dom';

type ResponsiveBreakpointType =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';

const formatData = (environment: 'public cloud' | 'private cloud') => {
  return Object.keys(virtualMachines[environment]).reduce((acc, cloud) => {
    acc[cloud] = Object.keys(virtualMachines[environment][cloud]).map(
      dataSet => {
        return {
          key: `${cloud}-${dataSet}`,
          name: dataSet,
          count: virtualMachines[environment][cloud][dataSet].length,
          data: virtualMachines[environment][cloud][dataSet],
        };
      },
    );
    return acc;
  }, {});
};

const publicCloud = formatData('public cloud');
const privateCloud = formatData('private cloud');

const dataSets = {
  'Private cloud': privateCloud,
  'Public cloud': publicCloud,
};

const cloudTypes = ['Private cloud', 'Public cloud'];
const defaultPrivate =
  dataSets['Private cloud']['HPE Private Cloud Las Vegas'][0];
const defaultPublic = dataSets['Public cloud']['AWS'][0];

const reponsiveGrid = (size: ResponsiveBreakpointType) => {
  const columns = {
    xsmall: ['auto'],
    small: ['auto'],
    medium: ['auto'],
    large: ['auto', 'flex'],
    xlarge: ['auto', 'flex'],
  };
  const gap = {
    xsmall: 'xsmall',
    small: 'xsmall',
    medium: 'medium',
    large: 'medium',
    xlarge: 'large',
  };

  return {
    columns: columns[size],
    gap: gap[size],
  };
};

export const Collection = ({ ...rest }) => {
  const [cloudType, setCloudType] = React.useState('Private cloud');
  const [dataSet, setDataSet] = React.useState(defaultPrivate);
  const [tableColumns, setTableColumns] = React.useState(privateCloudColumns);
  const breakpoint = useContext(ResponsiveContext);

  // Set the default data set based on the cloud type
  useEffect(() => {
    if (cloudType === 'Public cloud') {
      setDataSet(defaultPublic);
      setTableColumns(publicCloudColumns);
    } else {
      setDataSet(defaultPrivate);
      setTableColumns(privateCloudColumns);
    }
  }, [cloudType]);

  const responsiveColumns = useMemo(() => {
    const exclude = {
      'Private cloud': {
        xsmall: ['cluster', 'state', 'power state'],
        small: ['cluster', 'state'],
        medium: ['cluster'],
      },
      'Public cloud': {
        xsmall: ['account', 'state'],
        small: ['account'],
      },
    };
    const nextColumns = tableColumns.filter(
      column => !exclude[cloudType]?.[breakpoint]?.includes(column.property),
    );
    return nextColumns;
  }, [tableColumns, breakpoint, cloudType]);

  const compactMenu = ['xsmall', 'small', 'medium'].includes(breakpoint);

  const collectionMenu = (
    <CollectionMenu
      items={dataSets[cloudType]}
      selected={dataSet}
      onSelect={setDataSet}
      drop={compactMenu}
    />
  );

  const tabContent = (
    <Grid
      {...reponsiveGrid(breakpoint as ResponsiveBreakpointType)}
      pad={{ top: 'medium' }}
      align="start"
    >
      <ContentPane
        heading={undefined}
        level={2}
        actions={undefined}
        skeleton={undefined}
        round="small"
        contain={!compactMenu}
      >
        {collectionMenu}
      </ContentPane>
      <ContentPane
        heading={dataSet.name}
        level={2}
        actions={undefined}
        skeleton={undefined}
        round="small"
      >
        <DataView data={dataSet.data} columns={responsiveColumns} />
      </ContentPane>
    </Grid>
  );

  return (
    <Page pad={{ bottom: '3xlarge' }} {...rest}>
      <PageContent>
        <PageHeader
          title="Virtual Machines"
          actions={<PageActions />}
          parent={
            <RoutedAnchor
              as={Link}
              label="Layouts"
              to="/layouts"
              icon={<Previous />}
            />
          }
        />
        <Tabs
          alignControls="start"
          activeIndex={cloudTypes.indexOf(cloudType)}
          onActive={index => setCloudType(cloudTypes[index])}
        >
          <Tab title="Private cloud">{tabContent}</Tab>
          <Tab title="Public cloud">{tabContent}</Tab>
        </Tabs>
      </PageContent>
    </Page>
  );
};
