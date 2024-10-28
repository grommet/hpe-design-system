import React from 'react';
/* eslint-disable max-len */
import { SimpleSelector } from 'aries-site/src/examples/templates/selector/SelectorSimple';
import { QuickFilter as QuickFilterExample } from 'aries-site/src/examples/templates/selector/QuickFilter';
import { SupportSelector } from 'aries-site/src/examples/templates/selector/SupportSelector';

export const Simple = () => <SimpleSelector />;
export const QuickFilter = () => <QuickFilterExample />;
export const Support = () => <SupportSelector />;

export default {
  title: 'Selector',
};
