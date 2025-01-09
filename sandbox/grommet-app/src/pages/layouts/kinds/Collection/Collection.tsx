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
import { privateCloudColumns, publicCloudColumns } from "./tableColumns";
import virtualMachines from '../../../../mockData/virtualMachines.json';

const dataSets = {
  "Vegas cluster": virtualMachines["private cloud"]["HPE Private Cloud Las Vegas"]["Vegas cluster"],
  "EXSi Cluster 321": virtualMachines["private cloud"]["vCenter"]["EXSi Cluster 321"],
  "engineering": virtualMachines["public cloud"]["AWS"]["engineering"],
  "marketing": virtualMachines["public cloud"]["AWS"]["marketing"],
  "sales": virtualMachines["public cloud"]["AWS"]["sales"],
  "engineering-2": virtualMachines["public cloud"]["Azure"]["engineering"],
  "marketing-2": virtualMachines["public cloud"]["Azure"]["marketing"],
  "sales-2": virtualMachines["public cloud"]["Azure"]["sales"],
};

const menuItems = {
  "Private cloud": Object.keys(virtualMachines["private cloud"]).reduce((acc, cluster) => {
    acc[cluster] = Object.keys(virtualMachines["private cloud"][cluster]).map((dataSet) => {
      return { name: dataSet, count: virtualMachines["private cloud"][cluster][dataSet].length };
    });
    return acc;
  }, {}),
  "Public cloud": Object.keys(virtualMachines["public cloud"]).reduce((acc, cloud) => {
    acc[cloud] = Object.keys(virtualMachines["public cloud"][cloud]).map((dataSet) => {
      return { name: dataSet, count: virtualMachines["public cloud"][cloud][dataSet].length };
    });
    return acc;
  }, {}),
};

const cloudTypes = ["Private cloud", "Public cloud"];

export const Collection = ({ ...rest }) => {
  const [cloudType, setCloudType] = React.useState("Private cloud");
  const [dataSet, setDataSet] = React.useState("Vegas cluster");

  return (
    <Page pad={{ bottom: "xlarge" }} {...rest}>
      <PageContent>
        <PageHeader
          title="Virtual Machines"
          actions={<PageActions />}
        />
        <Tabs
          alignControls="start"
          activeIndex={cloudTypes.indexOf(cloudType)}
          onActive={index => setCloudType(cloudTypes[index])}
        >
          <Tab title="Private cloud">
            <Grid columns={['auto', 'flex']} gap="large" pad={{ top: 'medium' }}>
              <ContentPane
                heading={undefined}
                level={2}
                actions={undefined}
                skeleton={undefined}
                round="small"
              >
                <CollectionMenu items={menuItems[cloudType]} selected={dataSet} onSelect={setDataSet} />
              </ContentPane>
              <ContentPane
                heading={dataSet}
                level={2}
                actions={<DataTableActions />}
                skeleton={undefined}
                round="small"
              >
                <DataView data={dataSets[dataSet]} columns={privateCloudColumns} />
              </ContentPane>
            </Grid>
          </Tab>
          <Tab title="Public cloud">
            <Grid columns={['auto', 'flex']} gap="large" pad={{ top: 'medium' }}>
              <ContentPane
                heading={undefined}
                level={2}
                actions={undefined}
                skeleton={undefined}
                round="small"
              >
                <CollectionMenu items={menuItems[cloudType]} selected={dataSet} onSelect={setDataSet} />
              </ContentPane>
              <ContentPane
                heading={dataSet}
                level={2}
                actions={<DataTableActions />}
                skeleton={undefined}
                round="small"
              >
                <DataView data={dataSets[dataSet]} columns={publicCloudColumns} />
              </ContentPane>
            </Grid>
          </Tab>
        </Tabs>
      </PageContent>
    </Page >
  );
}