'use client';

import { useContext } from 'react';
import { ResponsiveContext } from 'grommet';

/**
 * Returns the current responsive breakpoint string from Grommet's
 * ResponsiveContext ('xsmall', 'small', 'medium', 'large', or 'xlarge').
 *
 * Use this when you need the raw breakpoint string — for example, as an
 * object key or a switch statement. For boolean responsive checks, prefer
 * the semantic hooks in useResponsive (useIsMobile, useIsTabletAndUp, etc.).
 *
 * @example
 * const breakpoint = useBreakpoint();
 * const gridAreas = responsiveGridAreas[breakpoint] ?? defaultGridAreas;
 */
export const useBreakpoint = (): string => useContext(ResponsiveContext);
