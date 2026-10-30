// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useLayoutEffect, useRef, useState } from 'react';

// Width of a DOM element, kept current with a ResizeObserver. Used for
// charts whose container width changes as shell panels open and close —
// Grommet's Chart only re-measures a 'full' width on window resize.
export const useElementWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    // ResizeObserver reports once on observe(), so no synchronous measure.
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.floor(entry.contentRect.width)),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
};
