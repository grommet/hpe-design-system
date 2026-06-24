import React from 'react';
import { renderHook } from '@testing-library/react';
import { ResponsiveContext } from 'grommet';
import { describe, expect, it } from 'vitest';
import { useBreakpoint } from '../useBreakpoint';

const wrapper =
  (breakpoint: string) =>
  ({ children }: { children: React.ReactNode }) => (
    <ResponsiveContext.Provider value={breakpoint}>
      {children}
    </ResponsiveContext.Provider>
  );

describe('useBreakpoint', () => {
  it('returns the breakpoint value provided by ResponsiveContext', () => {
    const { result } = renderHook(() => useBreakpoint(), {
      wrapper: wrapper('medium'),
    });
    expect(result.current).toBe('medium');
  });

  it('reflects a small breakpoint for mobile viewports', () => {
    const { result } = renderHook(() => useBreakpoint(), {
      wrapper: wrapper('small'),
    });
    expect(result.current).toBe('small');
    expect(['xsmall', 'small'].includes(result.current)).toBe(true);
  });
});
