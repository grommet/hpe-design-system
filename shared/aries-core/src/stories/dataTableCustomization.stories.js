import React from 'react';
import { ColumnSettingsExample } from 'apps/docs/src/examples/templates/table-customization/components/ColumnSettingsExample';
import { TableCustomizationExample } from 'apps/docs/src/examples/templates/table-customization/components/TableCustomizationExample';
import ColumnSettingsExampleSource from 'apps/docs/src/examples/templates/table-customization/components/ColumnSettingsExample.js?raw';
import TableCustomizationExampleSource from 'apps/docs/src/examples/templates/table-customization/components/TableCustomizationExample.js?raw';

const meta = {
  title: 'Patterns/DataTable Customization',
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
};

export default meta;

export const ColumnSettings = {
  render: () => <ColumnSettingsExample />,
  parameters: {
    docs: {
      source: {
        code: ColumnSettingsExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const TableCustomization = {
  render: () => <TableCustomizationExample />,
  parameters: {
    docs: {
      source: {
        code: TableCustomizationExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
