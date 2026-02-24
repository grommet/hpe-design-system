// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/CheckBoxGroup/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import { BoxProps } from '../Box/index';
import { CheckBoxProps } from '../CheckBox/index';

interface OnChangeEvent {
  value: string;
  option: string | CheckBoxProps;
}

export interface CheckBoxType
  extends Omit<
    CheckBoxProps &
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
    'checked'
  > {
  [key: string]: any;
}

export interface CheckBoxGroupProps {
  value?: (number | string)[];
  defaultValue?: (number | string)[];
  disabled?: boolean;
  labelKey?: string;
  name?: string;
  onChange?: (event?: OnChangeEvent) => void;
  options: (CheckBoxType | string)[];
  valueKey?: string;
}

// CheckBoxGroup extends BoxProps for layout
export interface CheckBoxGroupExtendedProps extends CheckBoxGroupProps, BoxProps {}

declare const CheckBoxGroup: React.FC<CheckBoxGroupExtendedProps>;

export { CheckBoxGroup };
