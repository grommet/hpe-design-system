import { useState } from 'react';
import { ColumnSettings } from './ColumnSettings';

const COLUMNS = [
  { property: 'name', header: 'Name', primary: true },
  { property: 'status', header: 'Status' },
  { property: 'role', header: 'Role' },
  { property: 'location', header: 'Location' },
  { property: 'hoursAvailable', header: 'Hours Available', align: 'end' },
];

export const ColumnSettingsExample = props => {
  const [columns, setColumns] = useState(COLUMNS);
  return (
    <ColumnSettings
      columns={columns}
      setColumns={setColumns}
      visible={columns.map(col => col.property)}
      setVisible={() => {}}
      {...props}
    />
  );
};