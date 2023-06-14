import { useRef, useEffect, useCallback } from 'react';
import { AmplitudeTracker } from '../../amplitude/prod_app/trackers';
import {
  PROD_ENV,
  isGreenlakeProductSite,
} from '../../amplitude/prod_app/validation';
import { getPrivacyState } from '../../amplitude/common/privacy';
import { setupFakeLog } from '../../amplitude/common/fakelog';
import { PAGE_EVENT_NAME } from '../../amplitude/prod_app/constants';
import { getAnalyticsData } from '../analytics';

const analytics = (event, tracker) => {
  if (tracker) {
    const data = getAnalyticsData(event);
    if (data) {
      const dataLayer = tracker.buildDatalayer(data.ruleLabel);
      console.log('\x1B[1;44m ANALYTICS \x1B[0m', data, event, tracker);
      tracker.track(data.ruleLabel, data.eventName,
        {
          ...dataLayer,
          ...(data.data),
        },
      );
    }
  }
};

const setupTracker = () => {
  const privacyState = getPrivacyState(window);
  if (privacyState.isAnalyticsAllowed) {
    const env = isGreenlakeProductSite(window);
    const log = env === PROD_ENV ? setupFakeLog(window) : window.console;
    const isDebug = env !== PROD_ENV;
    const tracker = new AmplitudeTracker(window, log, isDebug);
    tracker.setup();
    // Trigger a tracking call
    tracker.track('app-start', PAGE_EVENT_NAME);
    return tracker;
  }
  return null;
};

export const useAnalytics = () => {
  const trackerRef = useRef();

  const analyticsCallback = useCallback(
    (event) => analytics(event, trackerRef.current),
    [],
  );

  useEffect(() => {
    const tracker = setupTracker();
    trackerRef.current = tracker;
  }, []);

  return analyticsCallback;
};
