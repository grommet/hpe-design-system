// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/RadioButtonGroup/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface RadioButtonGroupProps {
  children?: Function;
  disabled?: boolean;
  name: string; // required
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: (
    | string
    | number
    | boolean
    | {
        disabled?: boolean;
        id?: string;
        label?: string | React.ReactNode;
        value: string | number | boolean;
      }
  )[];
  value?: string | number | boolean | object;
}

// RadioButtonGroup extends BoxProps for layout
export interface RadioButtonGroupExtendedProps extends RadioButtonGroupProps, BoxProps {}

declare const RadioButtonGroup: React.FC<RadioButtonGroupExtendedProps>;

export { RadioButtonGroup };
