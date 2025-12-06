import React from 'react';
/* eslint-disable max-len */
import { ColumnSettingsExample } from 'aries-site/src/examples/templates/table-customization/components/ColumnSettingsExample';
import { TableCustomizationExample } from 'aries-site/src/examples/templates/table-customization/components/TableCustomizationExample';

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
