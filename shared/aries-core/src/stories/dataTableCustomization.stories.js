/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { ColumnSettingsExample } from 'apps/aries-site/src/examples/templates/table-customization/components/ColumnSettingsExample';
import { TableCustomizationExample } from 'apps/aries-site/src/examples/templates/table-customization/components/TableCustomizationExample';

const meta = {
  title: 'DataTable Customization',
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
