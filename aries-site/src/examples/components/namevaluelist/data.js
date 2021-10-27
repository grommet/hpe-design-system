import { Anchor, Box } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

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

export const gridData = {
  Description: 'Whether to enable email link user authentication',
  'Ephemeral Storage': '54.7%  (3000 GB of 5489 GB)',
  'Kubernetes Verison': '19.7',
  'IP Address': '172.98.09182.98.00.1.2567',
  'Created On': '13/02/2021 at 14:23:32',
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
