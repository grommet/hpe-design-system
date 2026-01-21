/* eslint-disable grommet/datatable-aria-describedby */
import React from 'react';
import { DataTable } from 'grommet';
import { AllowSelectAllExample } from './datatable-allow-select-all.example';
import rawSourceCode from './datatable-allow-select-all.example.jsx?raw';
import { processRawSource } from '../../.storybook/utils';

const sourceCode = processRawSource(rawSourceCode);

const meta = {
  title: 'DataTable/Allow Select All',
  component: DataTable,
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
};

export default meta;

export const AllowSelectAll = {
  parameters: {
    docs: {
      source: {
        code: sourceCode,
      },
    },
  },
  render: () => <AllowSelectAllExample />,
};
