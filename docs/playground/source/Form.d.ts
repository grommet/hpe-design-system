// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/Form/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';

export interface FormExtendedEvent<R = Record<string, unknown>, T = Element>
  extends React.FormEvent<T> {
  value: R;
  touched: Record<string, boolean>;
}

export interface FormProps<T> {
  errors?: {};
  infos?: {};
  kind?: string;
  messages?: { invalid?: string; required?: string };
  onChange?: (value: T, options: { touched?: Record<string, boolean> }) => void;
  onSubmit?: (event: FormExtendedEvent<T>) => void;
  onReset?: (event: React.SyntheticEvent) => any;
  onValidate?: (validationResults: {
    errors: Record<string, any>;
    infos: Record<string, any>;
    valid: boolean;
  }) => void;
  validate?: 'blur' | 'submit' | 'change';
  value?: T;
}

declare const Form: <T = {}>(
  p: FormProps<T> & Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onChange' | 'onSubmit'>,
) => React.ReactElement;

export { Form };
