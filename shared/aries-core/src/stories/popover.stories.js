/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { PopoverInlineExample } from 'apps/docs/src/examples/templates/popover/PopoverInlineExample';
import { PopoverSimpleExample } from 'apps/docs/src/examples/templates/popover/PopoverSimpleExample';

const meta = {
  title: 'Patterns/Popover',
};

export default meta;

export const PopoverInline = {
  render: () => <PopoverInlineExample />,
};

export const PopoverSimple = {
  render: () => <PopoverSimpleExample />,
};
