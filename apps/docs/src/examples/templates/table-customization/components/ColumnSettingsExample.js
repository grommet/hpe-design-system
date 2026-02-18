import { Data, DataTableColumns } from 'grommet';

const COLUMNS = [
  { property: 'name', label: 'Name' },
  { property: 'status', label: 'Status' },
  { property: 'role', label: 'Role' },
  { property: 'location', label: 'Location' },
  { property: 'hoursAvailable', label: 'Hours available' },
];

export const ColumnSettingsExample = () => {
  return (
    <Data data={[]}>
      <DataTableColumns options={COLUMNS} />
    </Data>
  );
};
