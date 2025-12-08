import React from 'react';
/* eslint-disable max-len */
import { PopoverInlineExample } from 'aries-site/src/examples/templates/popover/PopoverInlineExample';
import { PopoverSimpleExample } from 'aries-site/src/examples/templates/popover/PopoverSimpleExample';

const meta = {
  title: 'Popover',
};

export default meta;

export const PopoverInline = {
  render: () => <PopoverInlineExample />,
};

export const PopoverSimple = {
  render: () => <PopoverSimpleExample />,
};
