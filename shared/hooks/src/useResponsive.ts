'use client';

import { useBreakpoint } from './useBreakpoint';

/**
 * Checks if the current breakpoint is mobile-sized (xsmall or small).
 *
 * @example
 * const isMobile = useIsMobile();
 * return isMobile ? <MobileLayout /> : <DesktopLayout />;
 */
export const useIsMobile = (): boolean =>
  ['xsmall', 'small'].includes(useBreakpoint());

/**
 * Checks if the current breakpoint is tablet or larger (medium and up).
 * Negation of useIsMobile() - useful for "NOT mobile" logic.
 *
 * @example
 * const isTabletAndUp = useIsTabletAndUp();
 * direction={isTabletAndUp ? 'row' : 'column'}
 */
export const useIsTabletAndUp = (): boolean =>
  !['xsmall', 'small'].includes(useBreakpoint());

/**
 * Checks if the current breakpoint is mobile or tablet-sized (xsmall, small, or medium).
 * Useful for distinguishing mobile/tablet from full desktop.
 *
 * @example
 * const isMobileOrTablet = useIsMobileOrTablet();
 * if (isMobileOrTablet) adjustSpacing();
 */
export const useIsMobileOrTablet = (): boolean =>
  ['xsmall', 'small', 'medium'].includes(useBreakpoint());

/**
 * Checks if the current breakpoint is desktop-sized (large or xlarge).
 *
 * @example
 * const isDesktop = useIsDesktop();
 * if (isDesktop) showDesktopFeatures();
 */
export const useIsDesktop = (): boolean =>
  ['large', 'xlarge'].includes(useBreakpoint());

/**
 * Factory hook for custom breakpoint checks.
 * Use this when the predefined hooks don't cover your use case.
 *
 * @param breakpoints - Array of breakpoint strings to check against
 * @returns true if current breakpoint is in the provided array
 *
 * @example
 * // Check for a specific custom breakpoint set
 * const isSmallOrMedium = useIsBreakpoint(['small', 'medium']);
 */
export const useIsBreakpoint = (breakpoints: string[]): boolean =>
  breakpoints.includes(useBreakpoint());
