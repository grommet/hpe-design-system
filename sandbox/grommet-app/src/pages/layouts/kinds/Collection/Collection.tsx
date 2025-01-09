import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Menu,
  Page,
  PageContent,
  PageHeader,
  Tab,
  Tabs,
} from 'grommet';
import { MoreVertical, Refresh, Share } from "grommet-icons";
import ContentPane from "../../../../components/ContentPane";
import { DataView } from "./DataView";
import { CollectionMenu } from "./CollectionMenu";
import virtualMachines from '../../../../mockData/virtualMachines.json';

const dataSets = {
  "Vegas cluster": virtualMachines,
  "EXSi Cluster 321": undefined,
};

export const Collection = ({ ...rest }) => {
  const [dataSet, setDataSet] = React.useState("Vegas cluster");

  return (
    <Page pad={{ bottom: "xlarge" }} {...rest}>
      <PageContent>
        <PageHeader
          title="Virtual Machines"
          actions={<PageActions />}
        />
        <Tabs alignControls="start">
          <Tab title="Private cloud">
            <Grid columns={['auto', 'flex']} gap="large" pad={{ top: 'medium' }}>
              <ContentPane
                heading={undefined}
                level={2}
                actions={undefined}
                skeleton={undefined}
                round="small"
              >
                <CollectionMenu selected={dataSet} onSelect={setDataSet} />
              </ContentPane>
              <ContentPane
                heading={dataSet}
                level={2}
                actions={<DataTableActions />}
                skeleton={undefined}
                round="small"
              >
                <DataView data={dataSets[dataSet]} />
              </ContentPane>
            </Grid>
          </Tab>
          <Tab title="Public cloud">
            <Box>Content for tab 2</Box>
          </Tab>
        </Tabs>

      </PageContent>
    </Page >
  );
}

const DataTableActions = () => {
  return (
    <Box direction="row">
      <Menu label="Actions" items={[]} />
    </Box>
  );
}

const PageActions = () => {
  const menuItems = [
    { label: 'Edit', onClick: () => { } },
    { label: 'Delete', onClick: () => { } },
  ];

  return (
    <Box direction="row">
      <Button a11yTitle="Refresh" icon={<Refresh />} onClick={() => { }} />
      <Button a11yTitle="Share" icon={<Share />} onClick={() => { }} />
      <Menu
        a11yTitle="Actions"
        icon={<MoreVertical />}
        items={menuItems}
        dropAlign={{ top: 'bottom', right: 'right' }}
      />
    </Box>
  );
}