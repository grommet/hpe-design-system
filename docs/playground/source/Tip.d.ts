// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/Tip/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import { DropType } from '../Drop';

export interface TipProps {
  children?: React.ReactNode;
  content?: React.ReactNode;
  defaultVisible?: boolean;
  dropProps?: DropType;
  plain?: boolean;
}

declare const Tip: React.FC<TipProps>;

export { Tip };
