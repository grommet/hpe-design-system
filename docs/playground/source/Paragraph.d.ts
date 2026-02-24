// Source: https://raw.githubusercontent.com/grommet/grommet/master/src/js/components/Paragraph/index.d.ts
// Fetched: 2026-02-23

import * as React from 'react';
import {
  A11yTitleType,
  AlignSelfType,
  ColorType,
  GridAreaType,
  MarginType,
  Omit,
  TextAlignType,
} from '../../utils';

export interface ParagraphProps {
  a11yTitle?: A11yTitleType;
  alignSelf?: AlignSelfType;
  color?: ColorType;
  fill?: boolean;
  gridArea?: GridAreaType;
  margin?: MarginType;
  maxLines?: number;
  responsive?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | string;
  textAlign?: TextAlignType;
}

export interface ParagraphExtendedProps
  extends ParagraphProps,
    Omit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >,
      'color'
    > {}

declare const Paragraph: React.FC<ParagraphExtendedProps>;

export { Paragraph };
