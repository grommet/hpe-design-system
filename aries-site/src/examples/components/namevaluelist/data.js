import { Box } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

export const alignmentData = {
  'Created by': 'jane.doe@email.com',
  'Created on': '2021-10-05T14:48:00.000Z',
  Policies: '13',
};

export const anatomyData = {
  'Single Line Description': 'This is an example of a single-line description',
  'Multi-line Description': `This is an example of a multi-line description like
   full-service AI insights, security and unified infrastructure management for
   campus, branch, remote, and data center networks`,
  'Created by': 'jane.doe@email.com',
  'List of Items': 'Item 1, Item 2, Item 3, Item 4, Item 5',
};

export const defaultData = {
  'Created on': '2021-10-05T14:48:00.000Z',
  Description: 'Full-service AI insights and data center networks',
  'IP Address': '172.98.09182.98.00.1.2567',
};

export const iconNameData = {
  Active: '90',
  'In Progress': '24',
};

export const iconValueData = {
  Temperature: 'Ok',
  Storage: 'Warning',
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
  'Created on': '13/02/2021 at 14:23:32',
};

export const languageData = {
  Languages: `English, Spanish, French, Chinese, Japanese, German,
   Korean, Italian, Arabic, Portugese, Russian`,
  'Operating System': `VMware ESXi 6.7.0 Build-14320388 Update
   3 Patch 73 6.7.0 Build-14320388 Update 3 Patch 73 ESXi 6.7.0
   Build-14320388 Update 3 Patch 73 6.7.0 ESXi 6.7.0 Build-14320388
   Update 3 Patch 73 6.7.0 `,
};

export const profileData = {
  'First Name': 'Jane',
  'Middle Name': '',
  Country: 'United States',
  'Phone Number': '',
  Email: 'jane.smith@hpe.com',
};

export const simpleData = {
  'Created on': '2021-10-05T14:48:00.000Z',
  'Created by': 'jane.doe@email.com',
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
