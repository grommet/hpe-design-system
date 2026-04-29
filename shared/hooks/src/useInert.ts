'use client';

import { RefObject, useEffect, useRef } from 'react';

/**
 * A hook that marks a container element as inert, blocking focus,
 * pointer events, and hiding it from the accessibility tree for all
 * descendants automatically — no selector querying needed.
 *
 * Ideal for card previews and other non-interactive display components.
 * Restores the previous inert state on unmount, making it safe to compose
 * with other hooks or libraries that may also manage inertness.
 *
 * @template T - The type of the HTML element the ref is attached to.
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
export const useInert = <T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const previous = container.inert; // Store previous inert state to restore on unmount
    container.inert = true;

    return () => {
      container.inert = previous;
    };
  }, []);

  return ref;
};