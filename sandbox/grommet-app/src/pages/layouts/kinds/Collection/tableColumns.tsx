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

interface Column {
  property: string;
  header: string;
  primary?: boolean;
  align?: 'start' | 'center' | 'end';
  render?: (datum: VirtualMachine) => string;
  units?: string;
}

const privateCloudColumns: Column[] = [
  { property: 'name', header: 'Name', primary: true },
  { property: 'status', header: 'Status' },
  { property: 'state', header: 'State' },
  { property: 'power state', header: 'Power state' },
  { property: 'protection', header: 'Protection' },
  { property: 'cluster', header: 'Cluster' },
];

const publicCloudColumns: Column[] = [
  { property: 'name', header: 'Name', primary: true },
  { property: 'status', header: 'Status' },
  { property: 'state', header: 'State' },
  { property: 'account', header: 'Account' },
  { property: 'region', header: 'Region' },
  { property: 'type', header: 'Type' },
];

export { privateCloudColumns, publicCloudColumns };
