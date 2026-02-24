// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/Button/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  BackgroundType,
  ColorType,
  FillType,
  GapType,
  GridAreaType,
  HoverIndicatorType,
  MarginType,
  PadType,
  PolymorphicType,
} from '../../utils';
import { TipProps } from '../Tip';

export interface ButtonProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  badge?:
    | boolean
    | number
    | {
        background?: BackgroundType;
        max?: number;
        value?: boolean | number;
      }
    | JSX.Element;
  children?:
    | React.ReactNode
    | (({
        disabled,
        hover,
        focus,
      }: {
        disabled: boolean;
        hover: boolean;
        focus: boolean;
      }) => React.ReactNode);
  busy?: boolean;
  gridArea?: GridAreaType;
  margin?: MarginType;
  active?: boolean;
  color?: ColorType;
  disabled?: boolean;
  fill?: FillType;
  focusIndicator?: boolean | 'inset';
  gap?: GapType;
  hoverIndicator?: HoverIndicatorType;
  href?: string;
  justify?:
    | 'around'
    | 'between'
    | 'center'
    | 'end'
    | 'evenly'
    | 'start'
    | 'stretch';
  target?: '_self' | '_blank' | '_parent' | '_top' | string;
  icon?: JSX.Element;
  kind?: string;
  label?: React.ReactNode;
  messages?: {
    busy?: string;
    success?: string;
  };
  pad?: PadType;
  plain?: boolean;
  primary?: boolean;
  reverse?: boolean;
  secondary?: boolean;
  size?: 'small' | 'medium' | 'large' | string;
  success?: boolean;
  tip?: TipProps | string;
  type?: 'button' | 'reset' | 'submit';
  as?: PolymorphicType;
  onClick?: (event: React.MouseEvent) => void;
}

declare const Button: React.FC<ButtonProps>;

export { Button };
