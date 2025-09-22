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
