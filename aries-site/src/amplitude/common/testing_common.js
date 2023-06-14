export const TESTING_FLAG = 'testal';
export const TESTING_ANALYTICS_CACHE_STATE = '__analyticsTestingConditionFlag';

export function getCookiesAndQSParameters (window) {
  return (window.document.cookie + window.location.search).toLowerCase();
}

export function setTestingCondition (window, sessionStorage, flag = 'true') {
  sessionStorage.setItem(TESTING_FLAG, flag);
  // eslint-disable-next-line no-param-reassign
  return (window[TESTING_ANALYTICS_CACHE_STATE] = true);
}
export function isTestingCondition (window) {
  // Check for cached testing condition,
  // return cache if already defined / processed
  const cache = window[TESTING_ANALYTICS_CACHE_STATE];
  if (typeof (cache) !== 'undefined') { return cache; }
  // Begin processing for test conditions
  const testingRegExp = new RegExp(`${TESTING_FLAG}=([^?&#;]+)`);
  const { sessionStorage } = window;
  // Check query string first.  This overrides everything later
  const queryTestingExp = testingRegExp.exec(window.location.search);
  if (queryTestingExp) {
    return setTestingCondition(window, sessionStorage, queryTestingExp[1]);
  }
  // Check session storage next
  const sessStorageFlag = sessionStorage.getItem(TESTING_FLAG);

  if (sessStorageFlag && sessStorageFlag.length > 0) {
    return setTestingCondition(window, sessionStorage, sessStorageFlag);
  }
  // Process cookies finally
  const cookieTestingExp = testingRegExp.exec(window.document.cookie);
  if (cookieTestingExp) {
    return setTestingCondition(window, sessionStorage, cookieTestingExp[1]);
  }
  // eslint-disable-next-line no-param-reassign
  return (window[TESTING_ANALYTICS_CACHE_STATE] = false);
}
export function fetchTestingCondition (window) {
  if (window[TESTING_ANALYTICS_CACHE_STATE] || isTestingCondition(window)) {
    return window.sessionStorage.getItem(TESTING_FLAG);
  }
  return undefined;
}