// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/CheckBox/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import { A11yTitleType, PadType } from '../../utils';

export interface CheckBoxProps {
  a11yTitle?: A11yTitleType;
  checked?: boolean;
  children?: React.ReactNode | Function;
  disabled?: boolean;
  fill?: boolean;
  id?: string;
  label?: React.ReactNode;
  name?: string;
  pad?: PadType;
  reverse?: boolean;
  toggle?: boolean;
  indeterminate?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare const CheckBox: React.FC<CheckBoxProps>;

export { CheckBox };
