interface VirtualMachine {
  name: string;
  status: string;
  os: string;
  cpu: number;
  memory: string;
  disk: string;
}

interface Column {
  property: string;
  header: string;
  primary?: boolean;
  align?: 'start' | 'center' | 'end';
  render?: (datum: VirtualMachine) => string;
  units?: string;
}

const columns: Column[] = [
  { property: 'name', header: 'Name', primary: true },
  { property: 'status', header: 'Status' },
  { property: 'os', header: 'OS' },
  { property: 'cpu', header: 'vCPUs', align: 'end' },
  {
    property: 'memory',
    header: 'Memory',
    align: 'end',
    render: (datum: VirtualMachine) => `${datum.memory.replace('GB', '')}`,
    units: 'GB',
  },
  {
    property: 'disk',
    header: 'Disk',
    align: 'end',
    render: (datum: VirtualMachine) => `${datum.disk.replace('GB', '')}`,
    units: 'GB',
  },
];

export { columns }