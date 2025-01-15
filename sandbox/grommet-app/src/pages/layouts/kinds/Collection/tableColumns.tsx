import { ColumnConfig } from "grommet";

interface VirtualMachine {
  name: string;
  status: string;
  os: string;
  cpu: number;
  memory: string;
  disk: string;
  'power state': string;
  state: string;
  protection: string;
  cluster: string;
}

const privateCloudColumns: ColumnConfig<VirtualMachine>[] = [
  { property: 'name', header: 'Name', primary: true, pin: true },
  { property: 'status', header: 'Status' },
  { property: 'state', header: 'State' },
  { property: 'power state', header: 'Power state' },
  { property: 'protection', header: 'Protection' },
  { property: 'cluster', header: 'Cluster' },
];

const publicCloudColumns: ColumnConfig<VirtualMachine>[] = [
  { property: 'name', header: 'Name', primary: true, pin: true },
  { property: 'status', header: 'Status' },
  { property: 'state', header: 'State' },
  { property: 'account', header: 'Account' },
  { property: 'region', header: 'Region' },
  { property: 'type', header: 'Type' },
];

export { privateCloudColumns, publicCloudColumns };
