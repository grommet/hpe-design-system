// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useRef, useState } from 'react';
import { request } from '../api';

// Drives a mock fetch lifecycle: loading -> success | empty | error.
// `run` replays the request so each mockup can be re-triggered.
export const useSimulatedRequest = ({ data = [], delay, outcome }) => {
  const [status, setStatus] = useState('loading');
  const requestId = useRef(0);

  const run = useCallback(() => {
    requestId.current += 1;
    const id = requestId.current;
    setStatus('loading');
    request({ data, delay, outcome })
      .then(result => {
        if (id !== requestId.current) return;
        setStatus(result.length > 0 ? 'success' : 'empty');
      })
      .catch(() => {
        if (id !== requestId.current) return;
        setStatus('error');
      });
  }, [data, delay, outcome]);

  useEffect(() => {
    run();
    return () => {
      // invalidate in-flight responses on unmount / re-run
      requestId.current += 1;
    };
  }, [run]);

  return { status, run };
};
