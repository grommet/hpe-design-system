/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { ColumnSettingsExample } from 'apps/docs/src/examples/templates/table-customization/components/ColumnSettingsExample';
import { TableCustomizationExample } from 'apps/docs/src/examples/templates/table-customization/components/TableCustomizationExample';

const meta = {
  title: 'Patterns/DataTable Customization',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const ColumnSettings = {
  render: () => <ColumnSettingsExample />,
};

export const TableCustomization = {
  render: () => <TableCustomizationExample />,
};
