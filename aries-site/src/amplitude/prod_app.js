import { getPrivacyState } from './common/privacy';
import { PAGE_EVENT_NAME } from './prod_app/constants';
import { AmplitudeTracker } from './prod_app/trackers';
import { isGreenlakeProductSite, PROD_ENV } from './prod_app/validation';

import { setupFakeLog } from './common/fakelog';

try { window.console.success = window.console.info; } catch (e) { /* empty */ }

const privacyState = getPrivacyState(window);
if (privacyState.isAnalyticsAllowed) {
  const env = isGreenlakeProductSite(window);
  const log = env === PROD_ENV ? setupFakeLog(window) : window.console;
  const isDebug = env !== PROD_ENV;
  // Configure each tracker
  const trackers = [
    new AmplitudeTracker(window, log, isDebug),
  ];
  log.info('Loaded: prod_app.js, Initialized Trackers');
  window.addEventListener('APP.ANALYTICS.INITIALIZE', (e) => {
    log.info('Caught: APP.ANALYTICS.INITIALIZE event');
    // Trigger each tracker
    trackers.forEach((tracker) => {
      // Set Okta ID if it exists
      // eslint-disable-next-line no-param-reassign
      tracker.oktaId = e.detail.oktaId;
      // Setup trackers
      tracker.setup();
      // Trigger a tracking call
      tracker.track('app-start', PAGE_EVENT_NAME);
    });
  });
  log.info('Loaded: prod_app.js, adding APP.ANALYTICS.INITIALIZE listener');
  log.info('Done: prod_app.js');
}
