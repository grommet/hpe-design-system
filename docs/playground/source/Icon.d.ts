// Source: packages/icons-grommet/src/js/StyledIcon.d.ts (local workspace)
// Note: HPE Design System uses @hpe-design/icons-grommet — NOT grommet-icons.
// All HPE icons are ForwardRefExoticComponents extending StyledIconProps.
// Fetched: 2026-02-23

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export interface StyledIconProps extends SVGProps<SVGSVGElement> {
  viewBox?: string;
  a11yTitle?: string;
  color?: string;
  size?: string | number;
}

export const StyledIcon: ForwardRefExoticComponent<
  StyledIconProps & RefAttributes<SVGSVGElement>
>;
