import React from "react";
import {
  Box,
  Button,
  Data,
  DataTable,
  Menu,
  Page,
  PageContent,
  PageHeader,
  Pagination,
  Tab,
  Tabs
} from 'grommet';
import { MoreVertical, Refresh, Share } from "grommet-icons";
import virtualMachines from "../../../../mockData/virtualMachines.json";
import ContentPane from "../../../../components/ContentPane";
import { columns } from "./tableColumns";

export const Collection = ({ ...rest }) => {
  return (
    <Page pad={{ bottom: "xlarge" }}>
      <PageContent>
        <PageHeader
          title="Virtual Machines"
          actions={<PageActions />}
        />
        <Tabs alignControls="start">
          <Tab title="Private cloud">
            <ContentPane
              heading="Private cloud instances"
              level={2}
              actions={<DataTableActions />}
              skeleton={undefined}
            >
              <Box align="start">
                <Data data={virtualMachines} toolbar>
                  <DataTable columns={columns} onSelect={() => { }} />
                  <Pagination
                    summary
                    stepOptions
                    border={{ side: 'top', color: 'border' }}
                    pad={{ top: 'xsmall' }}
                  />
                </Data>
              </Box>
            </ContentPane>
          </Tab>
          <Tab title="Public cloud">
            <Box>Content for tab 2</Box>
          </Tab>
        </Tabs>

      </PageContent>
    </Page>
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