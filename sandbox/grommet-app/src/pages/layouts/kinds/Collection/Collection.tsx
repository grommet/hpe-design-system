import React from "react";
import {
  Box,
  Grid,
  Page,
  PageContent,
  PageHeader,
  Tab,
  Tabs,
} from 'grommet';
import ContentPane from "../../../../components/ContentPane";
import { DataView } from "./DataView";
import { CollectionMenu } from "./CollectionMenu";
import { DataTableActions } from "./DataTableActions";
import { PageActions } from "./PageActions";
import virtualMachines from '../../../../mockData/virtualMachines.json';

const dataSets = {
  "Vegas cluster": virtualMachines["private cloud"]["Vegas cluster"],
  "EXSi Cluster 321": virtualMachines["private cloud"]["EXSi Cluster 321"],
};

const menuItems = {
  "HPE Private Cloud Las Vegas": [{ name: "Vegas cluster", count: dataSets["Vegas cluster"].length }],
  "vCenter 1": [{ name: "EXSi Cluster 321", count: dataSets["EXSi Cluster 321"].length }],
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
                <CollectionMenu items={menuItems} selected={dataSet} onSelect={setDataSet} />
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