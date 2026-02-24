// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/FormField/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import { PlaceHolderType, MarginType } from '../../utils';
import { BoxProps } from '../Box/index';

export interface FormFieldProps {
  contentProps?: BoxProps;
  disabled?: boolean;
  error?: string | React.ReactNode;
  help?: string | React.ReactNode;
  htmlFor?: string;
  info?: string | React.ReactNode;
  label?: string | React.ReactNode;
  margin?: MarginType;
  name?: string;
  options?: string[];
  pad?: boolean;
  placeholder?: PlaceHolderType;
  required?: boolean | { indicator: boolean };
  component?: any;
  validate?:
    | {
        regexp?: object;
        message?: string | React.ReactNode;
        status?: 'error' | 'info';
      }
    | ((...args: any[]) => any)
    | (
        | {
            regexp?: object;
            message?: string | React.ReactNode;
            status?: 'error' | 'info';
          }
        | ((...args: any[]) => any)
      )[]
    | {
        max: number;
        threshold?: number;
      };
  validateOn?: 'blur' | 'submit' | 'change';
  onBlur?: (event: React.FocusEvent) => void;
  onChange?: (event: React.ChangeEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
}

declare const FormField: React.FC<FormFieldProps>;

export { FormField };
