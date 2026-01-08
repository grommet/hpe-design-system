/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { SimpleSelector } from 'aries-site/src/examples/templates/selector/SelectorSimple';
import { QuickFilter as QuickFilterExample } from 'aries-site/src/examples/templates/selector/QuickFilter';
import { SupportSelector } from 'aries-site/src/examples/templates/selector/SupportSelector';

const meta = {
  title: 'Selector',
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
