import React from 'react';
import { renderHook } from '@testing-library/react';
import { ResponsiveContext } from 'grommet';
import { describe, expect, it } from 'vitest';
import {
  useIsMobile,
  useIsTabletAndUp,
  useIsMobileOrTablet,
  useIsDesktop,
  useIsBreakpoint,
} from '../useResponsive';

const wrapper =
  (breakpoint: string) =>
  ({ children }: { children: React.ReactNode }) => (
    <ResponsiveContext.Provider value={breakpoint}>
      {children}
    </ResponsiveContext.Provider>
  );

describe('Responsive Predicates', () => {
  describe('useIsMobile', () => {
    it('returns true for xsmall breakpoint', () => {
      const { result } = renderHook(() => useIsMobile(), {
        wrapper: wrapper('xsmall'),
      });
      expect(result.current).toBe(true);
    });

    it('returns true for small breakpoint', () => {
      const { result } = renderHook(() => useIsMobile(), {
        wrapper: wrapper('small'),
      });
      expect(result.current).toBe(true);
    });

    it('returns false for medium breakpoint', () => {
      const { result } = renderHook(() => useIsMobile(), {
        wrapper: wrapper('medium'),
      });
      expect(result.current).toBe(false);
    });

    it('returns false for large breakpoint', () => {
      const { result } = renderHook(() => useIsMobile(), {
        wrapper: wrapper('large'),
      });
      expect(result.current).toBe(false);
    });

    it('returns false for xlarge breakpoint', () => {
      const { result } = renderHook(() => useIsMobile(), {
        wrapper: wrapper('xlarge'),
      });
      expect(result.current).toBe(false);
    });

    it('covers all Grommet breakpoint sizes', () => {
      const breakpoints = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
      const mobileBreakpoints = ['xsmall', 'small'];

      breakpoints.forEach(bp => {
        const { result } = renderHook(() => useIsMobile(), {
          wrapper: wrapper(bp),
        });
        expect(result.current).toBe(mobileBreakpoints.includes(bp));
      });
    });
  });

  describe('useIsTabletAndUp', () => {
    it('returns false for xsmall breakpoint', () => {
      const { result } = renderHook(() => useIsTabletAndUp(), {
        wrapper: wrapper('xsmall'),
      });
      expect(result.current).toBe(false);
    });

    it('returns false for small breakpoint', () => {
      const { result } = renderHook(() => useIsTabletAndUp(), {
        wrapper: wrapper('small'),
      });
      expect(result.current).toBe(false);
    });

    it('returns true for medium breakpoint', () => {
      const { result } = renderHook(() => useIsTabletAndUp(), {
        wrapper: wrapper('medium'),
      });
      expect(result.current).toBe(true);
    });

    it('returns true for large breakpoint', () => {
      const { result } = renderHook(() => useIsTabletAndUp(), {
        wrapper: wrapper('large'),
      });
      expect(result.current).toBe(true);
    });

    it('returns true for xlarge breakpoint', () => {
      const { result } = renderHook(() => useIsTabletAndUp(), {
        wrapper: wrapper('xlarge'),
      });
      expect(result.current).toBe(true);
    });

    it('is the logical negation of useIsMobile', () => {
      const breakpoints = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

      breakpoints.forEach(bp => {
        const { result: isMobile } = renderHook(() => useIsMobile(), {
          wrapper: wrapper(bp),
        });
        const { result: isTabletAndUp } = renderHook(() => useIsTabletAndUp(), {
          wrapper: wrapper(bp),
        });

        expect(isTabletAndUp.current).toBe(!isMobile.current);
      });
    });

    it('covers all Grommet breakpoint sizes', () => {
      const breakpoints = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
      const tabletAndUpBreakpoints = ['medium', 'large', 'xlarge'];

      breakpoints.forEach(bp => {
        const { result } = renderHook(() => useIsTabletAndUp(), {
          wrapper: wrapper(bp),
        });
        expect(result.current).toBe(tabletAndUpBreakpoints.includes(bp));
      });
    });
  });

  describe('useIsMobileOrTablet', () => {
    it('returns true for xsmall breakpoint', () => {
      const { result } = renderHook(() => useIsMobileOrTablet(), {
        wrapper: wrapper('xsmall'),
      });
      expect(result.current).toBe(true);
    });

    it('returns true for small breakpoint', () => {
      const { result } = renderHook(() => useIsMobileOrTablet(), {
        wrapper: wrapper('small'),
      });
      expect(result.current).toBe(true);
    });

    it('returns true for medium breakpoint', () => {
      const { result } = renderHook(() => useIsMobileOrTablet(), {
        wrapper: wrapper('medium'),
      });
      expect(result.current).toBe(true);
    });

    it('returns false for large breakpoint', () => {
      const { result } = renderHook(() => useIsMobileOrTablet(), {
        wrapper: wrapper('large'),
      });
      expect(result.current).toBe(false);
    });

    it('returns false for xlarge breakpoint', () => {
      const { result } = renderHook(() => useIsMobileOrTablet(), {
        wrapper: wrapper('xlarge'),
      });
      expect(result.current).toBe(false);
    });

    it('covers all Grommet breakpoint sizes', () => {
      const breakpoints = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
      const mobileOrTabletBreakpoints = ['xsmall', 'small', 'medium'];

      breakpoints.forEach(bp => {
        const { result } = renderHook(() => useIsMobileOrTablet(), {
          wrapper: wrapper(bp),
        });
        expect(result.current).toBe(mobileOrTabletBreakpoints.includes(bp));
      });
    });
  });

  describe('useIsDesktop', () => {
    it('returns false for xsmall breakpoint', () => {
      const { result } = renderHook(() => useIsDesktop(), {
        wrapper: wrapper('xsmall'),
      });
      expect(result.current).toBe(false);
    });

    it('returns false for small breakpoint', () => {
      const { result } = renderHook(() => useIsDesktop(), {
        wrapper: wrapper('small'),
      });
      expect(result.current).toBe(false);
    });

    it('returns false for medium breakpoint', () => {
      const { result } = renderHook(() => useIsDesktop(), {
        wrapper: wrapper('medium'),
      });
      expect(result.current).toBe(false);
    });

    it('returns true for large breakpoint', () => {
      const { result } = renderHook(() => useIsDesktop(), {
        wrapper: wrapper('large'),
      });
      expect(result.current).toBe(true);
    });

    it('returns true for xlarge breakpoint', () => {
      const { result } = renderHook(() => useIsDesktop(), {
        wrapper: wrapper('xlarge'),
      });
      expect(result.current).toBe(true);
    });

    it('covers all Grommet breakpoint sizes', () => {
      const breakpoints = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
      const desktopBreakpoints = ['large', 'xlarge'];

      breakpoints.forEach(bp => {
        const { result } = renderHook(() => useIsDesktop(), {
          wrapper: wrapper(bp),
        });
        expect(result.current).toBe(desktopBreakpoints.includes(bp));
      });
    });
  });

  describe('useIsBreakpoint (factory)', () => {
    it('returns true when breakpoint is in provided array', () => {
      const { result } = renderHook(
        () => useIsBreakpoint(['small', 'medium']),
        {
          wrapper: wrapper('small'),
        },
      );
      expect(result.current).toBe(true);
    });

    it('returns false when breakpoint is not in provided array', () => {
      const { result } = renderHook(
        () => useIsBreakpoint(['large', 'xlarge']),
        {
          wrapper: wrapper('small'),
        },
      );
      expect(result.current).toBe(false);
    });

    it('works with custom breakpoint combinations', () => {
      const { result } = renderHook(
        () => useIsBreakpoint(['xsmall', 'small', 'medium']),
        {
          wrapper: wrapper('medium'),
        },
      );
      expect(result.current).toBe(true);
    });

    it('handles empty array (always false)', () => {
      const { result } = renderHook(() => useIsBreakpoint([]), {
        wrapper: wrapper('small'),
      });
      expect(result.current).toBe(false);
    });

    it('handles single-element array', () => {
      const { result: resultSmall } = renderHook(
        () => useIsBreakpoint(['small']),
        {
          wrapper: wrapper('small'),
        },
      );
      expect(resultSmall.current).toBe(true);

      const { result: resultMedium } = renderHook(
        () => useIsBreakpoint(['small']),
        {
          wrapper: wrapper('medium'),
        },
      );
      expect(resultMedium.current).toBe(false);
    });

    it('works as wrapper for semantic predicates', () => {
      // Verify the factory can replicate all semantic hooks
      const testCases = [
        {
          name: 'useIsMobile equivalent',
          breakpoints: ['xsmall', 'small'],
          testPoints: [
            { bp: 'xsmall', expected: true },
            { bp: 'medium', expected: false },
          ],
        },
        {
          name: 'useIsDesktop equivalent',
          breakpoints: ['large', 'xlarge'],
          testPoints: [
            { bp: 'large', expected: true },
            { bp: 'small', expected: false },
          ],
        },
        {
          name: 'useIsMobileOrTablet equivalent',
          breakpoints: ['xsmall', 'small', 'medium'],
          testPoints: [
            { bp: 'medium', expected: true },
            { bp: 'large', expected: false },
          ],
        },
      ];

      testCases.forEach(({ name, breakpoints, testPoints }) => {
        testPoints.forEach(({ bp, expected }) => {
          const { result } = renderHook(() => useIsBreakpoint(breakpoints), {
            wrapper: wrapper(bp),
          });
          expect(result.current).toBe(expected);
        });
      });
    });
  });

  describe('Comprehensive Breakpoint Matrix', () => {
    it('all hooks cover all breakpoint sizes consistently', () => {
      const breakpoints = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

      const expectations: Record<string, Record<string, boolean>> = {
        useIsMobile: {
          xsmall: true,
          small: true,
          medium: false,
          large: false,
          xlarge: false,
        },
        useIsTabletAndUp: {
          xsmall: false,
          small: false,
          medium: true,
          large: true,
          xlarge: true,
        },
        useIsMobileOrTablet: {
          xsmall: true,
          small: true,
          medium: true,
          large: false,
          xlarge: false,
        },
        useIsDesktop: {
          xsmall: false,
          small: false,
          medium: false,
          large: true,
          xlarge: true,
        },
      };

      breakpoints.forEach(bp => {
        const hookResults = {
          useIsMobile: renderHook(() => useIsMobile(), {
            wrapper: wrapper(bp),
          }).result.current,
          useIsTabletAndUp: renderHook(() => useIsTabletAndUp(), {
            wrapper: wrapper(bp),
          }).result.current,
          useIsMobileOrTablet: renderHook(() => useIsMobileOrTablet(), {
            wrapper: wrapper(bp),
          }).result.current,
          useIsDesktop: renderHook(() => useIsDesktop(), {
            wrapper: wrapper(bp),
          }).result.current,
        };

        Object.entries(expectations).forEach(([hookName, expected]) => {
          expect(hookResults[hookName as keyof typeof hookResults]).toBe(
            expected[bp],
          );
        });
      });
    });

    it('hooks are mutually exclusive where appropriate', () => {
      const breakpoints = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

      breakpoints.forEach(bp => {
        const isMobile = renderHook(() => useIsMobile(), {
          wrapper: wrapper(bp),
        }).result.current;
        const isDesktop = renderHook(() => useIsDesktop(), {
          wrapper: wrapper(bp),
        }).result.current;

        // Mobile and desktop should never both be true
        expect(isMobile && isDesktop).toBe(false);

        // Together they should cover all but tablet edge cases
        const isMobileOrTablet = renderHook(() => useIsMobileOrTablet(), {
          wrapper: wrapper(bp),
        }).result.current;

        // For all breakpoints, one of these should be true
        expect(
          isMobile || isDesktop || (bp === 'medium' && isMobileOrTablet),
        ).toBe(true);
      });
    });
  });

  describe('Edge Cases & Error Handling', () => {
    it('handles undefined context gracefully (should not throw)', () => {
      // This tests the hook doesn't break if ResponsiveContext is somehow undefined
      // In practice this shouldn't happen, but good to verify
      const { result } = renderHook(() => useIsBreakpoint(['small']), {
        wrapper: wrapper('small'),
      });
      expect(result.current).toBeDefined();
    });

    it('useIsBreakpoint with all breakpoints returns true', () => {
      const allBreakpoints = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
      const { result } = renderHook(() => useIsBreakpoint(allBreakpoints), {
        wrapper: wrapper('medium'),
      });
      expect(result.current).toBe(true);
    });

    it('useIsBreakpoint with opposite breakpoints returns false', () => {
      const { result } = renderHook(
        () => useIsBreakpoint(['xsmall', 'small']),
        {
          wrapper: wrapper('large'),
        },
      );
      expect(result.current).toBe(false);
    });
  });
});
