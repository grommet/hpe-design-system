import React, { useEffect } from "react";
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

const formatData = (environment: 'public cloud' | 'private cloud') => {
  return Object.keys(virtualMachines[environment]).reduce((acc, cloud) => {
    acc[cloud] = Object.keys(virtualMachines[environment][cloud]).map((dataSet) => {
      return {
        key: `${cloud}-${dataSet}`,
        name: dataSet,
        count: virtualMachines[environment][cloud][dataSet].length,
        data: virtualMachines[environment][cloud][dataSet]
      };
    });
    return acc;
  }, {});
}

const publicCloud = formatData("public cloud");
const privateCloud = formatData("private cloud");

const dataSets = {
  "Private cloud": privateCloud,
  "Public cloud": publicCloud,
};

const cloudTypes = ["Private cloud", "Public cloud"];
const defaultPrivate = dataSets["Private cloud"]["HPE Private Cloud Las Vegas"][0];
const defaultPublic = dataSets["Public cloud"]["AWS"][0];
console.log(defaultPublic);

export const Collection = ({ ...rest }) => {
  const [cloudType, setCloudType] = React.useState("Private cloud");
  const [dataSet, setDataSet] = React.useState(defaultPrivate);

  useEffect(() => {
    if (cloudType === "Public cloud") {
      setDataSet(defaultPublic);
    } else {
      setDataSet(defaultPrivate);
    }
  }, [cloudType]);

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
                <CollectionMenu items={dataSets[cloudType]} selected={dataSet} onSelect={setDataSet} />
              </ContentPane>
              <ContentPane
                heading={dataSet.name}
                level={2}
                actions={<DataTableActions />}
                skeleton={undefined}
                round="small"
              >
                <DataView data={dataSet.data} columns={privateCloudColumns} />
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
                <CollectionMenu items={dataSets[cloudType]} selected={dataSet} onSelect={setDataSet} />
              </ContentPane>
              <ContentPane
                heading={dataSet.name}
                level={2}
                actions={<DataTableActions />}
                skeleton={undefined}
                round="small"
              >
                <DataView data={dataSet.data} columns={publicCloudColumns} />
              </ContentPane>
            </Grid>
          </Tab>
        </Tabs>
      </PageContent>
    </Page >
  );
}