'use client';

import { RefObject, useEffect, useRef } from 'react';

/**
 * A hook that creates a ref and disables focus for common focusable elements
 * within the referenced container by setting `tabindex="-1"` on matching
 * `button`, `input`, `a`, `select`, and `textarea` descendants.
 * Useful for card previews and other non-interactive display components.
 *
 * @returns A ref object to attach to the container element.
 *
 * @example
 * const ref = useInert();
 * return <div ref={ref}>...</div>;
 *
 * // TypeScript users can optionally narrow the element type:
 * const ref = useInert<HTMLDivElement>();
 * return <div ref={ref}>...</div>;
 */
export const useInert = <
  T extends HTMLElement = HTMLElement,
>(): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      const focusables = ref.current.querySelectorAll(
        'button, input, a, select, textarea',
      );
      focusables.forEach(el => {
        el.setAttribute('tabindex', '-1');
      });
    }
  }, []);

  return ref;
};
