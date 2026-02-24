// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/TextInput/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import { A11yTitleType, PlaceHolderType, TextAlignType, WidthType } from '../../utils';
import { DropType } from '../Drop';

export interface TextInputProps {
  a11yTitle?: A11yTitleType;
  dropAlign?: {
    top?: 'top' | 'bottom';
    bottom?: 'top' | 'bottom';
    right?: 'left' | 'right';
    left?: 'left' | 'right';
  };
  dropHeight?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string;
  dropTarget?: object;
  dropProps?: DropType;
  focusIndicator?: boolean;
  defaultSuggestion?: number;
  icon?: JSX.Element;
  id?: string;
  messages?: {
    enterSelect?: string;
    suggestionsCount?: string;
    suggestionsExist?: string;
    suggestionIsOpen?: string;
  };
  name?: string;
  onSelect?: (x: { target: HTMLElement | null; suggestion: any }) => void;
  onSuggestionSelect?: (x: { target: HTMLElement | null; suggestion: any }) => void;
  onSuggestionsOpen?: () => void;
  onSuggestionsClose?: () => void;
  placeholder?: PlaceHolderType;
  plain?: boolean | 'full';
  readOnlyCopy?: boolean;
  reverse?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | string;
  suggestions?: ({ label?: React.ReactNode; value?: any } | string)[];
  textAlign?: TextAlignType;
  value?: string | number;
  width?: WidthType;
  onBlur?: (event: React.FocusEvent) => void;
  onChange?: (event: React.ChangeEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
}

declare const TextInput: React.FC<TextInputProps>;

export { TextInput };
