// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/TextArea/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import { A11yTitleType } from '../../utils';

export interface TextAreaProps {
  a11yTitle?: A11yTitleType;
  fill?: boolean;
  focusIndicator?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  plain?: boolean;
  resize?: 'vertical' | 'horizontal' | boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  value?: string;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

declare const TextArea: React.FC<TextAreaProps>;

export { TextArea };
