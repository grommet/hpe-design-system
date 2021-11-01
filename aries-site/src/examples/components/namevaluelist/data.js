import { Anchor, Box } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

export const alignmentData = {
  'Created by': (
    <Anchor label="jane.doe@email.com" href="mailto:jane.doe@email.com" />
  ),
  'Created on': '13/02/2021 at 14:23:32',
  Policies: '13',
};

export const anatomyData = {
  'Single Line Description': 'This is an example of a single-line description',
  'Multi-line Description': `This is an example of a multi-line description like
   full-service AI insights, security and unified infrastructure management for
   campus, branch, remote, and data center networks`,
  Anchors: (
    <Anchor label="jane.doe@email.com" href="mailto:jane.doe@email.com" />
  ),
  'List of Items': 'Item 1, Item 2, Item 3, Item 4, Item 5',
};

export const contentTruncationData = {
  State: 'Enabled',
  'Data Sources': `Azure EA, Azure IN - 003, HPE GreenLake (DEV)-00469,
     Azure EA-001, HPE Aruba (Dev)-03464, HPE GreenLake
     (Test)-004681, Azure EA-003, HPE Aruba (Stage)-03464,
     HPE GreenLake (DEV)-00468, Azure H-004, HPE Aruba
     (Dev)-03464, HPE GreenLake (Test)-004681, Azure EA-003,
     HPE Aruba (Stage)-03464, HPE GreenLake (DEV)-00468, Azure H-004`,
};

export const defaultData = {
  Power: 'Ok',
  Health: 'Critical',
  'Last Serviced': '7/14/2021',
};

export const data = {
  name: 'FirstName LastName',
  Username: 'firstname',
  Country: 'United States',
};

export const fontData = {
  'Serial Number': 'MXQ83700F3',
  'Product ID': 'JL258A',
  'IP Address': '172.16.255.321.8',
};

export const fontWeightData = {
  Policies: '23',
  Rules: '380',
  Compliance: '80%',
};

export const gridData = {
  Description: 'Whether to enable email link user authentication',
  'Ephemeral Storage': '54.7%  (3000 GB of 5489 GB)',
  'Kubernetes Verison': '19.7',
  'IP Address': '172.98.09182.98.00.1.2567',
  'Created On': '13/02/2021 at 14:23:32',
};

export const languageData = {
  Languages: `English, Spanish, French, Chinese, Japanese, German,
   Korean, Italian, Arabic, Portugese, Russian`,
  'Operating System': `VMware ESXi 6.7.0 Build-14320388 Update
   3 Patch 73 6.7.0 Build-14320388 Update 3 Patch 73 ESXi 6.7.0
   Build-14320388 Update 3 Patch 73 6.7.0 ESXi 6.7.0 Build-14320388
   Update 3 Patch 73 6.7.0 `,
};

export const simpleData = {
  'Created On': '13/02/2021 at 14:23:32',
  'Created by': (
    <Anchor label="jane.doe@email.com" href="mailto:jane.doe@email.com" />
  ),
  'Default Storage Class': 'Block Storage Cost',
  Description: `Full-service AI insights, security and unified infrastructure 
    management for campus, branch, remote, and data center networks`,
  'IP Address': '172.98.09182.98.00.1.2567',
};

export const serverData = {
  Health: (
    <Box gap="xsmall" direction="row">
      <StatusGoodSmall color="status-ok" />
      Healthy
    </Box>
  ),
  State: 'Active',
  ID: 'b3894722-adscb29308478-8032j',
  'API EndPoint': 'democluster1.dev.cloud.net',
  'Default Storage Class': 'Block Storage Cost',
  Description: 'This is a short description of the cluster.',
  Version: '1.18',
  Nodes: '3 Control Plane, 5 workers',
};
