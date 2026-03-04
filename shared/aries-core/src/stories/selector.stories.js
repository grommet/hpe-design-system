/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { SimpleSelector } from 'apps/docs/src/examples/templates/selector/SelectorSimple';
import { QuickFilter as QuickFilterExample } from 'apps/docs/src/examples/templates/selector/QuickFilter';
import { SupportSelector } from 'apps/docs/src/examples/templates/selector/SupportSelector';

const meta = {
  title: 'Patterns/Selector',
};

export default meta;

export const Simple = {
  render: () => <SimpleSelector />,
};

export const QuickFilter = {
  render: () => <QuickFilterExample />,
};

export const Support = {
  render: () => <SupportSelector />,
};
